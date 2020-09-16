import {
  Component
} from '@angular/core';
import {
  first
} from 'rxjs/operators';

import * as $ from 'jquery';
declare var jQuery: any;
import {
  User
} from '@app/_models';
import {
  UserService,
  AuthenticationService
} from '@app/_services';
import {
  HttpClient
} from '@angular/common/http';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeHtml,
  SafeUrl
} from '@angular/platform-browser';
import {
  ViewChild,
  OnInit,
  ElementRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

declare const Waypoint: any;

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./assets/css/vendor/animate.css', './assets/css/vendor/icomoon.css', './assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css', './assets/css/vendor/magnific-popup.css', './assets/css/vendor/owl.carousel.min.css', './assets/css/vendor/owl.theme.default.min.css', './assets/css/vendor/lightbox.min.css', './assets/css/main.css']
})
export class HomeComponent {

  loading = false;
  users: User[];
  urlSafe: SafeResourceUrl;
  src: SafeHtml;
  test: String;
  htmlStr2: String;
  to: Number;

  hotelForm: FormGroup;
  submitted = false;
  error = '';
  
  id: number = 1
  public collapse(id) {
    if (id != this.id) {
      jQuery("#collapse" + this.id).slideUp();
      jQuery("#collapse" + this.id + "0").slideUp();
      this.id = id;
      jQuery("#collapse" + this.id).slideDown();
      jQuery("#collapse" + this.id + "0").slideDown();
    }
  }

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private formBuilder: FormBuilder, ) {
  }


  // Hotel Form
  get f() {
    return this.hotelForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.f.inputname.value == '' || this.f.inputlastname.value == '' || this.f.inputEmail.value == '') {
      this.error = "error";
    }

    // stop here if form is invalid
    if (this.hotelForm.invalid) {
      return;
    }
    var name = this.f.inputname.value + " " + this.f.inputlastname.value;
    var rooms = "";
    var address = ""

    if (this.f.room0a.value > 0 && this.f.room0a.value != null) {
      rooms = rooms += "<p>" + this.f.room0a.value + "x Doppelzimmer Standard (104,00 €)</p>";
    }
    if (this.f.room1a.value > 0 && this.f.room1a.value != null) {
      rooms = rooms += "<p>" + this.f.room1a.value + "x Doppelzimmer Business (114,00 €)</p>";
    }
    if (this.f.room2a.value > 0 && this.f.room2a.value != null) {
      rooms = rooms += "<p>" + this.f.room2a.value + "x Doppelzimmer Deluxe (129,00 €)</p>";
    }
    if (this.f.room3a.value > 0 && this.f.room3a.value != null) {
      rooms = rooms += "<p>" + this.f.room3a.value + "x Appartement/Doppel (104,00 €)</p>";
    }
    if (this.f.room4a.value > 0 && this.f.room4a.value != null) {
      rooms = rooms += "<p>" + this.f.room4a.value + "x Appartement/Einzel (82,00 €)</p>";
    }
    if (this.f.room5a.value > 0 && this.f.room5a.value != null) {
      rooms = rooms += "<p>" + this.f.room5a.value + "x Einzelzimmer Standard (82,00 €)</p>";
    }
    if (this.f.room6a.value > 0 && this.f.room6a.value != null) {
      rooms = rooms += "<p>" + this.f.room6a.value + "x Einzelzimmer Business  (92,00 €)</p>";
    }
    if (this.f.room7a.value > 0 && this.f.room7a.value != null) {
      rooms = rooms += "<p>" + this.f.room7a.value + "x Dreibettzimmer (146,00 €)</p>";
    }
    if (this.f.inputDesc.value != null) {
      rooms = rooms += "<p> </p><p> Kommentare: " + this.f.inputDesc.value + "</p>";
    }

    if (this.f.inputname.value != null && this.f.inputlastname.value != null) {
      address = address += "<p>" + this.f.inputname.value + " " + this.f.inputlastname.value + "</p>";
    }
    if (this.f.inputstreet.value != null && this.f.inputhousenumber.value != null) {
      address = address += "<p>" + this.f.inputstreet.value + " " + this.f.inputhousenumber.value + "</p>";
    }
    if (this.f.inputZip.value != null && this.f.inputCity.value != null) {
      address = address += "<p>" + this.f.inputZip.value + " " + this.f.inputCity.value + "</p>";
    }
    if (this.f.inputCountry.value != null) {
      address = address += "<p>" + this.f.inputCountry.value + "</p>";
    }
    if (this.f.inputEmail.value != null) {
      address = address += "<p>" + this.f.inputEmail.value + "</p>";
    }
    if (this.f.inputPhone.value != null) {
      address = address += "<p>" + this.f.inputPhone.value + "</p>";
    }
    var str = "&replyTo=" + this.f.inputEmail.value + "&template=Wedding&merge_room=<div>" + rooms + "</div>&merge_address=" + address;
    $.post("https://api.elasticemail.com/v2/email/send?apikey=0F64F48E5B1CB804AA13FBAFC65373CEB91DC8B3DAC6487FFD0668CF998DB7711AB62F655895774947BB05E2251C920A&subject=Reservierungsanfrage Hochzeit Schmitz - " + name + "&msgFrom=mail@juliaraphael.de&msgTo=kontakt@parkhotel-atlantic.de&msgCC=raphael.schmitz@me.com;" + this.f.inputEmail.value + str, function (data) {
      jQuery("#emailsuccess").slideDown();
      console.log(rooms);
    });

  }

  //kontakt@parkhotel-atlantic.de

  ngOnInit() {
    this.hotelForm = this.formBuilder.group({
      inputname: ['', Validators.required],
      inputlastname: ['', Validators.required],
      inputstreet: [''],
      inputhousenumber: [''],
      inputZip: [''],
      inputCity: [''],
      inputCountry: [''],
      inputDesc: [''],
      inputEmail: ['', Validators.email],
      inputPhone: [''],
      room0a: [''],
      room1a: [''],
      room2a: [''],
      room3a: [''],
      room4a: [''],
      room5a: [''],
      room6a: [''],
      room7a: [''],
      room0: [''],
      room1: [''],
      room2: [''],
      room3: [''],
      room4: [''],
      room5: [''],
      room6: [''],
      room7: ['']
    });

    this.loading = false;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });

    $('.loader').delay(400).fadeOut('slow');
    setTimeout(function () {
      $('.cover .display-tc').addClass('fadeInUp');

    }, 1500);

    var continuousElements = document.getElementsByClassName('animate-box')
    for (var i = 0; i < continuousElements.length; i++) {
      new Waypoint({
        element: continuousElements[i],
        handler: function (direction) {
          console.log('Scrolled to waypoint!' + direction)
          if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {
            i++;
            $(this.element).addClass('item-animate');
            setTimeout(function () {
              $('body .animate-box.item-animate').each(function (k) {
                var el = $(this);
                setTimeout(function () {
                  var effect = el.data('animate-effect');
                  if (effect === 'fadeIn') {
                    el.addClass('fadeIn animated-fast');
                  } else if (effect === 'fadeInLeft') {
                    el.addClass('fadeInLeft animated-fast');
                  } else if (effect === 'fadeInRight') {
                    el.addClass('fadeInRight animated-fast');
                  } else {
                    el.addClass('fadeInUp animated-fast');
                  }
                  el.removeClass('item-animate');
                }, k * 200, 'easeInOutExpo');
              });
            }, 0);
          }
        },
        offset: 800
      })
    }

    //Countdown

    // Set the date we're counting down to
    var countDownDate = new Date("Sep 12, 2020 15:00:00").getTime();
    // Update the count down every 1 second
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // Display the result in the element with id="demo"
      //document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      $("#days").html(days + "");
      $("#hours").html(hours + "");
      $("#minutes").html(minutes + "");
      $("#seconds").html(seconds + "");
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);

    var date1 = new Date(new Date("02/04/2012 20:00:00").toLocaleString("en-US", {
      timeZone: "Europe/Berlin"
    }));
    var date2 = new Date(new Date().toLocaleString("en-US", {
      timeZone: "Europe/Berlin"
    }));
    // To calculate the time difference of two dates 
    var Difference_In_Time = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    $('.dayssince').attr('data-to', Difference_In_Days.toFixed(0));
    console.log(Difference_In_Days);
    $('.dayssince').text(Difference_In_Days.toFixed(0));
  }
}
