
var firebaseConfig = {
    apiKey: "AIzaSyB4O_8X802Zk-OLCCWfaqC4WXolysHLbMY",
    authDomain: "sleepypi-55a43.firebaseapp.com",
    databaseURL: "https://sleepypi-55a43.firebaseio.com",
    projectId: "sleepypi-55a43",
    storageBucket: "sleepypi-55a43.appspot.com",
    messagingSenderId: "788428879049",
    appId: "1:788428879049:web:78ba8ac513123f1d2f4918"
  };

firebase.initializeApp(firebaseConfig);
  
var db = firebase.firestore();
  

var mySwiper = new Swiper ('.swiper-container', {})

let scrollerSelectedIndex = 0

const updateIndex  = (index) => {
	const elements = document.querySelectorAll('.swiper-slide');
	console.log(index)
	db.collection('configuratie').doc('config').update({
		'toSleepMusic': elements.item(index).id
	});
}

mySwiper.on('slideNextTransitionStart', () => {
	scrollerSelectedIndex +=1;
	updateIndex(scrollerSelectedIndex);
})

mySwiper.on('slidePrevTransitionStart', () => {
	scrollerSelectedIndex -=1;
	updateIndex(scrollerSelectedIndex);
})

document.getElementById('volume').addEventListener('change', (ev) => {
	db.collection('configuratie').doc('config').update({
		'toSleepVolume': ev.target.value / 100
	});
})

const checkParameters = async () => {
	// get url
	let URL = '';
	const doc = await db.collection('configuratie').doc('config').get()
	URL = doc.data().ip;

	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get('sleeptracking') === 'start') {
		url = `http://${URL}:5000/sleeptracking`;
		fetch(url);
	} else if (urlParams.get('sleeptracking') === 'stop')  {
		url = `http://${URL}:5000/sleeptracking/stop`;
		fetch(url);
	} else if (urlParams.get('sleeptracking') === 'pause')  {
		url = `http://${URL}:5000/sleeptracking/pause`;
		fetch(url);
	} 
}

checkParameters();