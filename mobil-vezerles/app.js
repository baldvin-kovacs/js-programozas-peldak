let ctx;

let uirany = 0;
let lo = false;
let lovesSzam = 0;

let szoveg;

// A touchBaloldaliHatar lesz az az x koordináta, aminél
// kisebb koordinátájú pontot kell érinteni ahhoz, hogy lojon.

// A touchJobboldaliHatar lesz az az x koordináta, aminél
// nagyobb koordinátájú pontot kell érinteni ahhoz, hogy
// jobbra menjen.
let touchJobboldaliHatar1;
let touchJobboldaliHatar2;

function tapi(e) {
    // A preventDefault megakadályozza, hogy a touch event
    // default eseménye megtörténjen. Ez azért kell, mert úgyis
    // lekezeljük...
    e.preventDefault();
    for (let t of e.changedTouches) {
	// A t implementalja a Touch interface-t,
	// aminek a dokumentacioja: https://developer.mozilla.org/en-US/docs/Web/API/Touch
	if (e.type == "touchstart") {
	    if (t.clientX < touchBaloldaliHatar) {
		lo = true;
		lovesSzam++;
		continue;
	    }
	    if (t.clientX > touchJobboldaliHatar1 &&
		t.clientX < touchJobboldaliHatar2) {
		uirany = -1;
		continue;
	    }
	    if (t.clientX > touchJobboldaliHatar2) {
		uirany = 1;
		continue;
	    }
	}
	if (e.type == "touchend" || e.type == "touchcancel") {
	    if (t.clientX > touchJobboldaliHatar1 &&
		t.clientX < touchJobboldaliHatar2) {
		uirany = 0;
		continue;
	    }
	    if (t.clientX > touchJobboldaliHatar2) {
		uirany = 0;
		continue;
	    }
	}
    }
}

function lep() {
    ctx.clearRect(0, 0, 1000, 560);

    ctx.font = '22px sans';

    ctx.strokeText("Verzió: 1.5", 700, 50);

    if (lo) {
	ctx.strokeText(`Lő!! (Lövésszám: ${lovesSzam})`, 50, 50);
    } else {
	ctx.strokeText('Nem lő.', 50, 50);
    }

    if (uirany == -1) {
	ctx.strokeText('Balra megy.', 50, 100);
    } else if (uirany == 0) {
	ctx.strokeText('Áll.', 50, 100);
    } else {
	ctx.strokeText('Jobbra megy.', 50, 100);
    }
    
    requestAnimationFrame(lep);
}

function run() {
    const ablakSzelesseg = window.innerWidth;
    const ablakMagassag = window.innerHeight;

    touchBaloldaliHatar = ablakSzelesseg * 0.2;
    touchJobboldaliHatar1 = ablakSzelesseg * 0.6;
    touchJobboldaliHatar2 = ablakSzelesseg * 0.8;
    
    const cnvs = document.getElementById("cnvs");

    cnvs.style.width = `${ablakSzelesseg}px`;
    cnvs.style.height = `${ablakMagassag}px`;

    cnvs.ontouchstart = tapi;
    cnvs.ontouchend = tapi;
    cnvs.ontouchcancel = tapi;

    szoveg = document.getElementById("szoveg");

    ctx = cnvs.getContext("2d");
    requestAnimationFrame(lep);
}

window.onload = run;
