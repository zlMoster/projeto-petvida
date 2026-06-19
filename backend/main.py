from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
import json
import random
import os
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

app = FastAPI(title="ONG SJPA API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173",
        "http://localhost:5174", "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================
# HELPER FUNCTIONS
# =============================================

def load_json(filename: str):
    path = os.path.join(DATA_DIR, filename)
    if not os.path.exists(path):
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(filename: str, data):
    path = os.path.join(DATA_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def get_next_id(data: list) -> int:
    if not data:
        return 1
    return max(item["id"] for item in data) + 1

# =============================================
# MODELS
# =============================================

class CachorroOut(BaseModel):
    id: int
    nome: str
    idade: str
    raca: str
    porte: str
    vacinas: str
    castrado: str
    personalidade: str
    foto: str
    status: str

class CachorroCreate(BaseModel):
    nome: str
    idade: str
    raca: str
    porte: str
    vacinas: str
    castrado: str
    personalidade: str
    foto: str
    status: str = "disponivel"

class CachorroUpdate(BaseModel):
    nome: Optional[str] = None
    idade: Optional[str] = None
    raca: Optional[str] = None
    porte: Optional[str] = None
    vacinas: Optional[str] = None
    castrado: Optional[str] = None
    personalidade: Optional[str] = None
    foto: Optional[str] = None
    status: Optional[str] = None

class AdocaoCreate(BaseModel):
    cachorro_id: int
    nome: str
    email: EmailStr
    telefone: str
    endereco: str
    motivo: str

    @field_validator("nome")
    def nome_nao_vazio(cls, v):
        if not v.strip():
            raise ValueError("Nome é obrigatório")
        return v.strip()

    @field_validator("telefone")
    def telefone_valido(cls, v):
        digits = "".join(filter(str.isdigit, v))
        if len(digits) < 10:
            raise ValueError("Telefone deve ter pelo menos 10 dígitos")
        return v

    @field_validator("motivo")
    def motivo_tamanho(cls, v):
        if len(v.strip()) < 20:
            raise ValueError("Motivo deve ter pelo menos 20 caracteres")
        return v.strip()

    @field_validator("endereco")
    def endereco_nao_vazio(cls, v):
        if not v.strip():
            raise ValueError("Endereço é obrigatório")
        return v.strip()

class ContatoCreate(BaseModel):
    nome: str
    email: EmailStr
    assunto: str
    mensagem: str

    @field_validator("nome")
    def nome_nao_vazio(cls, v):
        if not v.strip():
            raise ValueError("Nome é obrigatório")
        return v.strip()

    @field_validator("mensagem")
    def mensagem_nao_vazio(cls, v):
        if not v.strip():
            raise ValueError("Mensagem é obrigatória")
        return v.strip()

class StatusUpdate(BaseModel):
    status: str

# =============================================
# ROTAS DE CACHORROS
# =============================================

@app.get("/api/cachorros/racas")
def listar_racas():
    dados = load_json("cachorros.json")
    racas = sorted(set(c["raca"] for c in dados))
    return {"racas": racas}

@app.get("/api/cachorros", response_model=List[CachorroOut])
def listar_cachorros(
    raca: Optional[str] = Query(None),
    porte: Optional[str] = Query(None),
    idade: Optional[str] = Query(None),
    random_order: bool = Query(False, alias="random")
):
    dados = load_json("cachorros.json")
    
    # Filtrar apenas disponíveis
    dados = [c for c in dados if c["status"] == "disponivel"]
    
    # Aplicar filtros
    if raca:
        dados = [c for c in dados if raca.lower() in c["raca"].lower()]
    if porte:
        dados = [c for c in dados if c["porte"].lower() == porte.lower()]
    if idade:
        dados = [c for c in dados if idade.lower() in c["idade"].lower()]
    
    # Ordem aleatória
    if random_order:
        random.shuffle(dados)
    
    return dados

@app.get("/api/cachorros/{cachorro_id}", response_model=CachorroOut)
def buscar_cachorro(cachorro_id: int):
    dados = load_json("cachorros.json")
    for c in dados:
        if c["id"] == cachorro_id:
            return c
    raise HTTPException(status_code=404, detail="Cachorro não encontrado")

# =============================================
# ROTAS DE ADOÇÃO
# =============================================

@app.post("/api/adocao")
def criar_pre_cadastro(adocao: AdocaoCreate):
    # Verificar se o cachorro existe
    cachorros = load_json("cachorros.json")
    cachorro = next((c for c in cachorros if c["id"] == adocao.cachorro_id), None)
    if not cachorro:
        raise HTTPException(status_code=404, detail="Cachorro não encontrado")
    if cachorro["status"] != "disponivel":
        raise HTTPException(status_code=400, detail="Cachorro não está disponível para adoção")
    
    pre_cadastros = load_json("pre_cadastros.json")
    
    novo = {
        "id": get_next_id(pre_cadastros),
        "cachorro_id": adocao.cachorro_id,
        "nome_cachorro": cachorro["nome"],
        "nome": adocao.nome,
        "email": adocao.email,
        "telefone": adocao.telefone,
        "endereco": adocao.endereco,
        "motivo": adocao.motivo,
        "data": datetime.now().isoformat(),
        "status": "pendente"
    }
    
    pre_cadastros.append(novo)
    save_json("pre_cadastros.json", pre_cadastros)
    
    return {
        "mensagem": "Pré-cadastro realizado com sucesso! Entraremos em contato em breve.",
        "id": novo["id"]
    }

# =============================================
# ROTAS DE CONTATO
# =============================================

@app.post("/api/contato")
def enviar_contato(contato: ContatoCreate):
    mensagens = load_json("contato.json")
    
    nova = {
        "id": get_next_id(mensagens),
        "nome": contato.nome,
        "email": contato.email,
        "assunto": contato.assunto,
        "mensagem": contato.mensagem,
        "data": datetime.now().isoformat()
    }
    
    mensagens.append(nova)
    save_json("contato.json", mensagens)
    
    return {"mensagem": "Mensagem enviada com sucesso! Responderemos em breve."}

# =============================================
# ROTAS DE DOAÇÕES
# =============================================

@app.get("/api/doacoes")
def listar_doacoes():
    dados = load_json("doacoes.json")
    return dados

# =============================================
# ROTAS ADMIN
# =============================================

ADMIN_PASSWORD = "admin123"

def check_admin(auth: str = Query(None)):
    if auth != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Não autorizado")

# --- Pre-cadastros ---

@app.get("/api/admin/pre-cadastros")
def listar_pre_cadastros(status: Optional[str] = Query(None), auth: str = Query(None)):
    check_admin(auth)
    dados = load_json("pre_cadastros.json")
    if status:
        dados = [p for p in dados if p["status"] == status]
    return dados

@app.get("/api/admin/pre-cadastros/{pre_cadastro_id}")
def buscar_pre_cadastro(pre_cadastro_id: int, auth: str = Query(None)):
    check_admin(auth)
    dados = load_json("pre_cadastros.json")
    for p in dados:
        if p["id"] == pre_cadastro_id:
            return p
    raise HTTPException(status_code=404, detail="Pré-cadastro não encontrado")

@app.put("/api/admin/pre-cadastros/{pre_cadastro_id}/status")
def atualizar_status_pre_cadastro(pre_cadastro_id: int, status_data: StatusUpdate, auth: str = Query(None)):
    check_admin(auth)
    dados = load_json("pre_cadastros.json")
    for p in dados:
        if p["id"] == pre_cadastro_id:
            p["status"] = status_data.status
            save_json("pre_cadastros.json", dados)
            return {"mensagem": f"Status atualizado para '{status_data.status}'"}
    raise HTTPException(status_code=404, detail="Pré-cadastro não encontrado")

# --- CRUD Cachorros (Admin) ---

@app.post("/api/admin/cachorros")
def criar_cachorro(cachorro: CachorroCreate, auth: str = Query(None)):
    check_admin(auth)
    dados = load_json("cachorros.json")
    novo = cachorro.model_dump()
    novo["id"] = get_next_id(dados)
    dados.append(novo)
    save_json("cachorros.json", dados)
    return {"mensagem": "Cachorro cadastrado com sucesso!", "id": novo["id"]}

@app.put("/api/admin/cachorros/{cachorro_id}")
def atualizar_cachorro(cachorro_id: int, dados_atualizados: CachorroUpdate, auth: str = Query(None)):
    check_admin(auth)
    dados = load_json("cachorros.json")
    for c in dados:
        if c["id"] == cachorro_id:
            update_data = dados_atualizados.model_dump(exclude_unset=True)
            c.update(update_data)
            save_json("cachorros.json", dados)
            return {"mensagem": "Cachorro atualizado com sucesso!"}
    raise HTTPException(status_code=404, detail="Cachorro não encontrado")

@app.delete("/api/admin/cachorros/{cachorro_id}")
def remover_cachorro(cachorro_id: int, auth: str = Query(None)):
    check_admin(auth)
    dados = load_json("cachorros.json")
    for i, c in enumerate(dados):
        if c["id"] == cachorro_id:
            dados.pop(i)
            save_json("cachorros.json", dados)
            return {"mensagem": "Cachorro removido com sucesso!"}
    raise HTTPException(status_code=404, detail="Cachorro não encontrado")

# --- Doações (Admin) ---

@app.put("/api/admin/doacoes")
def atualizar_doacoes(novas_doacoes: dict, auth: str = Query(None)):
    check_admin(auth)
    save_json("doacoes.json", novas_doacoes)
    return {"mensagem": "Lista de doações atualizada com sucesso!"}

# =============================================
# INICIALIZAÇÃO
# =============================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)