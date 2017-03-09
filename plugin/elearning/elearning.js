/**
 * Handles opening of and synchronization with the reveal.js
 * elearning window.
 *
 * Handshake process:
 * 1. This window posts 'connect' to elearning window
 *    - Includes URL of presentation to show
 * 2. ELearning window responds with 'connected' when it is available
 * 3. This window proceeds to send the current presentation state
 *    to the elearning window
 */
var RevealELearning = (function() {

	function openELearning( elearningFilePath ) {

		if( !elearningFilePath ) {
			var jsFileLocation = document.querySelector('script[src$="elearning.js"]').src;  // this js file path
			jsFileLocation = jsFileLocation.replace(/elearning\.js(\?.*)?$/, '');   // the js folder path
			elearningFilePath = jsFileLocation + 'elearning.html';
		}

		var elearningPopup = window.open( elearningFilePath, 'reveal.js - ELearning', 'width=1100,height=700' );

		/**
		 * Connect to the elearning window through a postmessage handshake.
		 * Using postmessage enables us to work in situations where the
		 * origins differ, such as a presentation being opened from the
		 * file system.
		 */
		function connect() {
			// Keep trying to connect until we get a 'connected' message back
			var connectInterval = setInterval( function() {
				elearningPopup.postMessage( JSON.stringify( {
					namespace: 'reveal-elearning',
					type: 'connect',
					url: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search,
					state: Reveal.getState()
				} ), '*' );
			}, 500 );

			window.addEventListener( 'message', function( event ) {
				var data = JSON.parse( event.data );
				if( data && data.namespace === 'reveal-elearning' && data.type === 'connected' ) {
					clearInterval( connectInterval );
					onConnected();
				}
			} );
		}

		/**
		 * Posts the current slide data to the elearning window
		 */
		function post(event) {

			var slideElement = Reveal.getCurrentSlide(),
				elearningElement = slideElement.querySelector( 'aside.elearning' );

			var messageData = {
				namespace: 'reveal-elearning',
				type: 'state',
				elearning: '',
				markdown: false,
				whitespace: 'normal',
				state: Reveal.getState()
			};

			// Look for elearning defined in a fragment, if it is a fragmentshown event
			if (event && event.hasOwnProperty('fragment')) {
				var innerELearning = event.fragment.querySelector( 'aside.elearning' );

				if ( innerELearning) {
					elearningElement = innerELearning;
				}
			}

			// Look for elearning defined in a slide attribute
			if( slideElement.hasAttribute( 'data-elearning' ) ) {
				messageData.elearning = slideElement.getAttribute( 'data-elearning' );
				messageData.whitespace = 'pre-wrap';
			}

			// Look for elearning defined in an aside element
			if( elearningElement ) {
				messageData.elearning = elearningElement.innerHTML;
				messageData.markdown = typeof elearningElement.getAttribute( 'data-markdown' ) === 'string';
			}

			elearningPopup.postMessage( JSON.stringify( messageData ), '*' );

		}

		/**
		 * Called once we have established a connection to the elearning
		 * window.
		 */
		function onConnected() {

			// Monitor events that trigger a change in state
			Reveal.addEventListener( 'slidechanged', post );
			Reveal.addEventListener( 'fragmentshown', post );
			Reveal.addEventListener( 'fragmenthidden', post );
			Reveal.addEventListener( 'overviewhidden', post );
			Reveal.addEventListener( 'overviewshown', post );
			Reveal.addEventListener( 'paused', post );
			Reveal.addEventListener( 'resumed', post );

			// Post the initial state
			post();

		}

		connect();

	}

	if( !/receiver/i.test( window.location.search ) ) {

		// If the there's a 'elearning' query set, open directly
		if( window.location.search.match( /(\?|\&)elearning/gi ) !== null ) {
			openELearning();
		}

		// Open the elearning when the 's' key is hit
		document.addEventListener( 'keydown', function( event ) {
			// Disregard the event if the target is editable or a
			// modifier is present
			if ( document.querySelector( ':focus' ) !== null || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey ) return;

			// Disregard the event if keyboard is disabled
			if ( Reveal.getConfig().keyboard === false ) return;

			if( event.keyCode === 69 ) {
				event.preventDefault();
				openELearning();
			}
		}, false );

		// Show our keyboard shortcut in the reveal.js help overlay
		if( window.Reveal ) Reveal.registerKeyboardShortcut( 'E', 'Speaker elearning view' );

	}

	return { open: openELearning };

})();
