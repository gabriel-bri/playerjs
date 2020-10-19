		
	//Cria um array com o nome das músicas
	let musics = ["../music/Chapa - Emicida.mp3", "../music/19 The Miracle (Of Joey Ramone) - U2.mp3", "../music/Prismo Weakness - NCS Release.mp3", "../music/Nothing is impossible - Planet Shakes.mp3"];
	let nomeMusics = ["Chapa", "19 The Miracle (Of Joey Ramone)", "Prismo Weakness", "Nothing is impossible"];
	let cantores = ["Emicida • 2016 • Rap", "U2 • 2014 • Rock", "NCS Release • 2017 • Eletrônica", "Planet Shakes • 2016 • Rock"];
	
	//Cria um array com a capa das músicas
	let poster = ["url('../posters/Poster1.jpg')","url('../posters/Poster2.jpg')","url('../posters/Poster3.jpg')", "url('../posters/Poster4.jpg')"];
	let posterDesfocados = ["url('../postersDesfocados/Poster1.jpg')","url('../postersDesfocados/Poster2.jpg')","url('../postersDesfocados/Poster3.jpg')", "url('../postersDesfocados/Poster4.jpg')"]
	
	let songTitle = document.querySelector("#songTitle");

	let posterTitle = document.querySelector("#posterTitle");

	let posterSubTitle = document.querySelector("#posterSubTitle");

	let posterDiv = document.querySelector("#poster");

	let autorMobile = document.querySelector("#autorMobile");
	
	let fillbar = document.querySelector("#fill");
	
	let currentTime = document.querySelector("#currentTime");
	
	let song = new Audio();
	let currentSong = 0;
	
	let posterFundo = document.querySelector("#posterFundo");
	let title_page = document.getElementsByTagName("title")[0];
	let iconePlay = document.querySelector("#play span");

	let bgImg = document.querySelector("#poster");
	let posterSong = document.querySelector("#image");
	
	window.onload = playSong;
	
	//Pega o volume atual e armazena
	let volume_now = song.volume;
	
	function playSong() {
		song.src = musics[currentSong];
		songTitle.textContent = nomeMusics[currentSong];
		posterTitle.textContent = nomeMusics[currentSong];
		posterSubTitle.textContent = cantores[currentSong];
		autorMobile.textContent = cantores[currentSong];
		song.play();
		title_page.text = "Tocando agora - " + musics[currentSong];
	}
	
	function playOrPauseSong() {
		if (song.paused) {
			//Verifica se a música está tocando, caso contrário, 
			//toca a música e muda seus ícones
			song.play();
			iconePlay.innerText = 'play_arrow';
			iconePlay.innerText = 'pause';
			console.log("Música tocando");
		}
		
		else {
			//Caso a primeira condição não seja atendida,
			//parte para o ELSE e pausa a música realizando a troca dos icones
			song.pause();
			iconePlay.innerText = 'pause';
			iconePlay.innerText = 'play_arrow';
			console.log("Música pausada");
		}
	}
	
	song.addEventListener('timeupdate', function() {
		//Pega a posição atual da música
		let position = 	song.currentTime / song.duration;
		
		//Preenche a barra de progresso
		fillbar.style.width = position * 100 + '%';
		
		//Converte decimal para inteiro
		convertTime(Math.round(song.currentTime));
		
		//Verifica se a música já acabou, caso verdade chama a função nextSong()
		if(song.ended) {
			nextSong();
		}
	})
	
	function convertTime(seconds) {
		let min = Math.floor(seconds / 60);
		let sec = seconds % 60;
		
		min = (min < 10) ? "0" + min : min;
		sec = (sec < 10) ? "0" + sec : sec;
		currentTime.textContent = min + ":" + sec;
		
		totalTime(Math.round(song.duration));
		
	}
	
	function totalTime(seconds) {
		let min = Math.floor(seconds / 60);
		let sec = seconds % 60;
		
		min = (min < 10) ? "0" + min : min;
		sec = (sec < 10) ? "0" + sec : sec;
		currentTime.innerHTML += "<span class='cor-principal'> • </span>" + min + ":" + sec;
	}
	
	function nextSong() {
		console.log("Próxima música...")
		//Incrementa o valor da música atual
		iconePlay.innerText = 'play_arrow';
		iconePlay.innerText = 'pause';
		currentSong++;
		
		//Verifica se a música atual é maior do que o número de dados do array - 1
		//Caso true reposiciona para o início do array
		if (currentSong > musics.length - 1) {
			currentSong = 0;
		}
		
		playSong();
		//Troca imagens do fundo e do poster
		posterFundo.style.backgroundImage = posterDesfocados[currentSong];
		bgImg.style.backgroundImage = poster[currentSong];
		posterSong.style.backgroundImage = poster[currentSong];
		
	}
	
	function previousSong() {
		console.log("Música anterior...");
		//Decrementa o valor da música atual
		currentSong--;
		
		//Verifica se a música atual é menor do que o número de dados do array - 1
		//Caso true reposiciona para o final do array
		if (currentSong < 0) {
			currentSong = musics.length - 1;
		}
		
		playSong();
		
		//Troca imagens do fundo e do poster
		posterFundo.style.backgroundImage = posterDesfocados[currentSong];
		bgImg.style.backgroundImage = poster[currentSong];
		posterSong.style.backgroundImage = poster[currentSong];
	}
	
	//Adiciona um ouvinte da janela e verifica as teclas pressionadas
	window.addEventListener('keyup', function(event){
		//Pega o valor ASCI das teclas recebidas através do evento
		let numeracao_teclado = event.which;
		
		console.log('Tecla número: ' + numeracao_teclado);
		
		if(numeracao_teclado === 32) {
			//Ativado ao apertar a tecla espaço
			playOrPauseSong();
		}
		
		else if(numeracao_teclado === 37) {
			//Ativado ao apertar a tecla da seta da esquerda
			previousSong();
		}
		
		else if(numeracao_teclado === 39) {
			//Ativado ao apertar a tecla da seta da direita
			nextSong();
		}
		
		else if(numeracao_teclado === 38) {
			//Ativado ao apertar a tecla para cima
			increaseVolume();
		}
		
		else if(numeracao_teclado === 40) {
			//Ativado ao apertar a tecla para baixo
			decreaseVolume();
		}
		
		else if(numeracao_teclado === 77) {
			//Ativado ao apertar a tecla M
			mute();
		}	
	});
	
	function decreaseVolume() {
		//Tenta diminuir o volume de 0.10
		try {
			song.volume -= 0.10;
		}
		
		//Caso ocorra erro emite um alerta
		catch {
			console.error('NÃO É POSSÍVEL DIMINUIR');
		}			
	}
	
	function increaseVolume() {
		//Tenta diminuir o volume de 0.10
		try {
			song.volume += 0.10;
		}
		
		//Caso ocorra erro emite um alerta			
		catch {
			console.error('NÃO É POSSÍVEL AUMENTAR');
		}
	}
	
	function mute() {
		//Verifica se o volume é maior que 0, caso verdade atribui o valor para 0
		if (song.volume > 0) {
			song.volume = 0;
		}
		
		//Caso contrário o volume recebe o seu valor antes de ser mutado
		else {
			song.volume = volume_now;
		}	
	}