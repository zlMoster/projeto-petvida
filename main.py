from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="API ONG SJPA")

# Configuração CORS para permitir conexão com o HTML local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo para validar os dados recebidos do Front-End
class MensagemContato(BaseModel):
    nome: str
    email: str
    assunto: str
    mensagem: str

# Rota para receber o formulário de contato
@app.post("/api/contato")
async def receber_contato(contato: MensagemContato):
    # Processamento dos dados (ex: salvar em BD SQLite)
    print("\n--- NOVA MENSAGEM RECEBIDA ---")
    print(f"Nome: {contato.nome}")
    print(f"Email: {contato.email}")
    print(f"Assunto: {contato.assunto}")
    print(f"Mensagem: {contato.mensagem}")
    print("------------------------------\n")
    
    return {
        "status": "sucesso", 
        "mensagem": f"Olá {contato.nome}, sua mensagem foi enviada com sucesso! A equipe da SJPA retornará em breve."
    }