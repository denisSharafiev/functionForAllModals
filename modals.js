const modals = () => {
    function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            // переменная для всех модалок, чтобы их закрывать
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();


        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) { e.preventDefault(); }
                // закрытие старых модалок при открытии нового
                windows.forEach(item=> {item.style.display = "none";})
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
            });
        });
        close.addEventListener('click', () => {
            windows.forEach(item=> {item.style.display = "none";})
            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item=> {item.style.display = "none";})
                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            }
        });
    }
    // автомат. открытие по времени
    function showModalByTime(selector, time) {
        setTimeout(()=>{
            // если есть открытая модалка в момент открытия автомата, то автомата не будет
            let display;
            document.querySelectorAll('[data-modal]').forEach(item=>{
                if(getComputedStyle(item).display !== 'none'){
                    display = 'block';
                }
            });
            if(!display){
                document.querySelector(selector).style.display = "block";
                document.body.style.overflow = "hidden";
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }

        }, time);
    }

    // чтоб не прыгал скролл при открытии модалки(подсчёт px скролла)
    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }

    bindModals('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModals('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModals('.pulse', '.popup-gift', '.popup-gift .popup-close');
    showModalByTime('.popup-consultation', 6000);
};

export default modals;
