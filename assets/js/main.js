
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
  
let URL = '';

// set field to db value
db.collection('configuratie').doc('config').get()
	.then(function(doc) {
		if (doc.exists) {
			document.getElementById('tracking-timer').value = doc.data().toSleepTimer;
			document.getElementById('tracking-display').value = doc.data().toSleepDisplay;
			document.getElementById('msg-input').value = doc.data().msg;
			document.getElementById('msg').checked = doc.data().wakeupAction === 'msg';
			document.getElementById('weather').checked = doc.data().wakeupAction === 'weather';
			if (doc.data().wakeupAction === 'msg') document.getElementById('msg-input').removeAttribute('disabled');
			URL = doc.data().ip;
		} else {
		// doc.data() will be undefined in this case
		console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
	});




// tracker scroller
let trackerScrollerSelectedIndex = 1;

const updateTrackerScroller = (index) => {
	const sea = document.getElementById('sea');
	const rain = document.getElementById('rain');
	const zen = document.getElementById('zen');
	sea.classList.remove('scroller__image--focus'); rain.classList.remove('scroller__image--focus'); zen.classList.remove('scroller__image--focus');
	const elements = document.querySelectorAll('#tracker-scroller .scroller__image');
	// console.log(trackerScrollerSelectedIndex)
	elements.item(index).classList.add('scroller__image--focus');
	db.collection('configuratie').doc('config').update({
		'toSleepMusic': elements.item(index).id
	});
	
};

const hammerTracker = new Hammer(document.getElementById('tracker-scroller'));
hammerTracker.on('swiperight', function(ev) {
	if (trackerScrollerSelectedIndex > 0) {
		trackerScrollerSelectedIndex += -1 ;
	}
	updateTrackerScroller(trackerScrollerSelectedIndex);
});

hammerTracker.on('swipeleft', function(ev) {
	if (trackerScrollerSelectedIndex < 2) {
		trackerScrollerSelectedIndex += 1; 
	}
	updateTrackerScroller(trackerScrollerSelectedIndex);
});

document.getElementById('tracking-timer').addEventListener('change', (ev) => {
	db.collection('configuratie').doc('config').update({
		'toSleepTimer': ev.target.value
	});
})

// alarm scroller 
let alarmScrollerSelectedIndex = 1;

const updateAlarmScroller = (index) => {
	const morning = document.getElementById('morning');
	const metal = document.getElementById('metal');
	const classic = document.getElementById('classic');
	morning.classList.remove('scroller__image--focus'); metal.classList.remove('scroller__image--focus'); classic.classList.remove('scroller__image--focus');
	const elements = document.querySelectorAll('#alarm-scroller .scroller__image');
	elements.item(index).classList.add('scroller__image--focus');
	db.collection('configuratie').doc('config').update({
		'alarmMusic': elements.item(index).id
	});
};

const hammerAlarm = new Hammer(document.getElementById('alarm-scroller'));
hammerAlarm.on('swiperight', function(ev) {
	if (alarmScrollerSelectedIndex > 0) {
		alarmScrollerSelectedIndex += -1 ;
	}
	updateAlarmScroller(alarmScrollerSelectedIndex);
});

hammerAlarm.on('swipeleft', function(ev) {
	if (alarmScrollerSelectedIndex < 2) {
		alarmScrollerSelectedIndex += 1; 
	}
	updateAlarmScroller(alarmScrollerSelectedIndex);
});


document.getElementById('tracking-display').addEventListener('change', (ev) => {
	db.collection('configuratie').doc('config').update({
		'toSleepDisplay': ev.target.value
	});
})

document.getElementById('weather').addEventListener('change', (ev) => {
	db.collection('configuratie').doc('config').update({
		'wakeupAction': ev.target.value
	});
	document.getElementById('msg-input').setAttribute('disabled', 'true');
})

document.getElementById('msg').addEventListener('change', (ev) => {
	document.getElementById('msg-input').removeAttribute('disabled');
	
	db.collection('configuratie').doc('config').update({
		'wakeupAction': ev.target.value
	});
})

document.getElementById('msg-input').addEventListener('change', (ev) => {
	db.collection('configuratie').doc('config').update({
		'wakeupAction': document.getElementById('msg').value,
		'msg': ev.target.value
	});
})



// routings



const checkParameters = async () => {
	// get url
	let URL = '';
	const doc = await db.collection('configuratie').doc('config').get()
	URL = doc.data().ip;

	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get('sleeptracking') === 'start') {
		url = `https://${URL}:5000/sleeptracking`;
		fetch(url);
		console.log('sss')
	} else if (urlParams.get('sleeptracking') === 'stop')  {
		url = `https://${URL}:5000/sleeptracking/stop`;
		fetch(url);
	} else if (urlParams.get('sleeptracking') === 'pause')  {
		url = `https://${URL}:5000/sleeptracking/pause`;
		fetch(url);
	} 

	if (urlParams.get('alarm') === 'start') {
		url = `https://${URL}:5000/alarm`;
		fetch(url);
	} else if (urlParams.get('alarm') === 'stop')  {
		url = `https://${URL}:5000/alarm/stop`;
		fetch(url);
	} 
	
}


checkParameters();