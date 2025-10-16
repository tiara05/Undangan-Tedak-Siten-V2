import { audio } from './audio.js';
import { storage } from './storage.js';
import { theme } from './theme.js';
import { util } from './util.js';

export const guest = (() => {

    const countDownDate = () => {
            const second = 1000,
                  minute = second * 60,
                  hour = minute * 60,
                  day = hour * 24;
          

            let today = new Date(),
                dd = String(today.getDate()).padStart(2, "0"),
                mm = String(today.getMonth() + 1).padStart(2, "0"),
                yyyy = today.getFullYear(),
                nextYear = yyyy + 1,
                month = 9, 
                date = 25,
                birthday = new Date(yyyy, month, date, 10, 0, 0); 

            if (today > birthday) {
                birthday = new Date(nextYear, month, date, 10, 0, 0);
            }

            
            const countDown = birthday.getTime(),
                x = setInterval(function() {    
          
                  const now = new Date().getTime(),
                        distance = countDown - now;
          
                  document.getElementById("days").innerText = Math.floor(distance / (day)),
                    document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
                    document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
                    document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
          
                  //do something later when date is reached
                  if (distance < 0) {
                    document.getElementById("headline").innerText = "It's my birthday!";
                    document.getElementById("countdown").style.display = "none";
                    document.getElementById("content").style.display = "block";
                    clearInterval(x);
                  }
                  //seconds
                }, 0)
    };
   
    const name = () => {
        const name = (new URLSearchParams(window.location.search)).get('to');
        const guest = document.getElementById('guest-name');

        if (!name || !guest) {
            guest.remove();
        } else {
            const div = document.createElement('div');
            div.classList.add('m-2');
            div.innerHTML = `<p class="mt-0 mb-1 mx-0 p-0" style="font-size: 0.95rem;">${guest.getAttribute('data-message')}</p><h2>${util.escapeHtml(name)}</h2>`;
            guest.appendChild(div);
        }

        const form = document.getElementById('form-name');
        if (form) {
            form.value = storage('information').get('name') ?? name;
        }
    };

    const open = (button) => {
        button.disabled = true;
    
        const leftPart = document.querySelector('.left');
        const rightPart = document.querySelector('.right');

    
        // Tambahkan animasi membuka
        leftPart.classList.add('open-left');
        rightPart.classList.add('open-right');

    
        // Tentukan delay yang sesuai (lebih lama untuk layar kecil)
        const delay = window.innerWidth <= 768 ? 1200 : 1000; 
    
        setTimeout(() => {
            document.body.style.overflowY = 'scroll';
            document.body.scrollIntoView({ behavior: 'instant' });
            util.opacity('welcome', 0.025);
    
            const invitationContainer = document.querySelector('.invitation-container');
            invitationContainer.classList.add('zoom-in');
    
            audio.play();
            audio.showButton();
            theme.showButtonChangeTheme();
    
            AOS.refresh();
        }, delay); // Delay animasi berdasarkan ukuran layar
    };
    
    const init = () => {
        countDownDate();

        
    };

    return {
        init,
        open,
        name,
    };
})();