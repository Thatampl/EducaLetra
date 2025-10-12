// Função para obter usuários salvos no localStorage
function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

// Função para salvar usuários no localStorage
function salvarUsuario(usuario) {
  const usuarios = getUsuarios();
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Lidar com cadastro
const cadastroForm = document.getElementById("cadastroForm");
if (cadastroForm) {
  cadastroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const email = document.getElementById("cadastroEmail").value.trim();
    const senha = document.getElementById("cadastroSenha").value.trim();

    const usuarios = getUsuarios();

    if (usuarios.find((u) => u.email === email)) {
      document.getElementById("cadastroErro").textContent = "E-mail já cadastrado.";
      return;
    }

    salvarUsuario({ nome, sobrenome, email, senha, pontuacao: 0 });
    alert("Conta criada com sucesso!");
    window.location.href = "index.html";
  });
}

// Lidar com login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const senha = document.getElementById("loginSenha").value.trim();

    const usuarios = getUsuarios();
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

    if (!usuario) {
      document.getElementById("loginErro").textContent = "E-mail ou senha incorretos.";
      return;
    }

    // Salvar usuário logado na sessão
    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    window.location.href = "jogos.html"; // Redirecionar para os jogos
  });
}
