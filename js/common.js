$(document).ready(function(){
	
	
	/* function helpers */
	const cl = console.log;
	/******************************************/
	
	
	
	/* Open form */
	$('button[data-target]').on( 'click' ,function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		var modalShow = (function(){
			$('#exampleModalCenter').modal('show');
		});
		
		setTimeout( modalShow ,5 );
		
	});
	/******************************************/
	
	
	
	/* Variable of the form */
	var
		nameValid   = false,
		phoneValid  = false,
		emailValid  = false,
		
		/* Ajax user info */
		nameText    = "",
		phoneText   = "",
		emailText   = "",
		
		/* Patterns */
		namePatterns    = /^[a-zA-Z\-]+$/,
		phonePatterns   = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
		emailPatterns   = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	/******************************************/
	
	
	
	
	function clean() {
		$('#name').val("").removeClass('valid');
		$('#phone').val("").removeClass('valid');
		$('#email').val("").removeClass('valid');
		$('#form button[type="submit"]').off( 'click');
		$('#form button[type="submit"]').on( 'click' ,function(e) {
			e.preventDefault();
			e.stopPropagation();
		});
		$('#form button[type="submit"]').removeClass('valid');
		nameValid   = false;
		phoneValid  = false;
		emailValid  = false;
		
		$('.user-info').removeClass('active');
		nameText    = "";
		phoneText   = "";
		emailText   = "";
		
		toleranceValid();
	}
	
	
	function toleranceValid() {
		if ( nameValid && phoneValid && emailValid ) {
			$('#form button[type="submit"]').addClass('valid');
			$('#form button[type="submit"]').off('click');
			$('button[data-target]').off( 'click');
			
			/* submit */
			$('#form button[type="submit"]').on('click' ,function ( e ) {
				e.preventDefault();
				e.stopPropagation();
				
				$('.user-info ul li:eq(0)').text( nameText );
				$('.user-info ul li:eq(1)').text( phoneText );
				$('.user-info ul li:eq(2)').text( emailText );
				$('.user-info').addClass('active');
				
				$('#exampleModalCenter').modal('hide');
				$('button[data-target]').text('clean');
				
				$('button[data-target]').on( 'click' ,function(e) {
					e.preventDefault();
					e.stopPropagation();
					
					clean();
					
					$('button[data-target]').text('create account')
					
					$('button[data-target]').on( 'click' ,function(e) {
						e.preventDefault();
						e.stopPropagation();
						
						let modalShow = (function(){
							$('#exampleModalCenter').modal('show');
						});
						
						setTimeout( modalShow ,5 );
						
					});
				});
				
			});
			
		}else {
			$('#form button[type="submit"]').on('click' ,function ( e ) {
				e.preventDefault();
				e.stopPropagation();
			});
			
			$('#form button[type="submit"]').removeClass('valid');
		}
	}
	
	
	function isValid ( __bindEvent ) {
		
		var
			val = $(__bindEvent.target).val(),
			el  = $(__bindEvent.target);
		
		if ( val !== '' ) {
			if ( val.match( __bindEvent.pattern ) ) {
				__bindEvent.isValidate   = true;
				el.addClass('valid');
				el.removeClass('novalid');
				// cl(__bindEvent.isValidate);
			} else {
				__bindEvent.isValidate   = false;
				el.addClass('novalid');
				el.removeClass('valid');
				// cl(__bindEvent.isValidate)
			}
		} else {
			el.removeClass('valid');
			el.removeClass('novalid');
		}
		
	}
	/******************************************/
	
	
	
	/* Events Forms */
	$('#name').bind('keyup keydown keypress focus change' ,function ( e ) {
		e.pattern = namePatterns;
		e.isValidate = false;
		isValid( e );
		nameValid =  e.isValidate;
		toleranceValid();
		nameText = $(this).val();
	});
	
	
	$('#phone').bind('keyup keydown keypress focus change' ,function ( e ) {
		e.pattern = phonePatterns;
		e.isValidate = false;
		isValid( e );
		phoneValid =  e.isValidate;
		toleranceValid();
		phoneText = $(this).val();
	});
	
	
	$('#email').bind('keyup keydown keypress focus change' ,function ( e ) {
		e.pattern = emailPatterns;
		e.isValidate = false;
		isValid( e );
		emailValid =  e.isValidate;
		toleranceValid();
		emailText = $(this).val();
	});
	/******************************************/
	
	
	
	/* Events Forms */
	$('#form button[type="submit"]').on('click' ,function ( e ) {
		e.preventDefault();
		e.stopPropagation();
		toleranceValid();
	});
	/******************************************/
	
	
});