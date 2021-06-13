// Create Countdown
var Countdown = {
  
    // Backbone-like structure
    $el: $('.countdown'),
    
    // Params
    countdown_interval: null,
    total_seconds     : 0,
    
    // Initialize the countdown  
    init: function() {
      // DOM
          this.$ = {
          days   : this.$el.find('.bloc-time.days .figure'),
          hours  : this.$el.find('.bloc-time.hours .figure'),
          minutes: this.$el.find('.bloc-time.min .figure'),
          seconds: this.$el.find('.bloc-time.sec .figure')
         };
  
      // Init countdown values
      let now = Date.now();
      let final_day = new Date("02/18/2022 00:00:00");
      this.total_seconds = final_day - now;
      this.total_days_full = this.total_seconds/(60*60*24*1000);
      this.total_hours_full = (this.total_days_full - parseInt(this.total_days_full))*24;
      this.total_minutes_full = (this.total_hours_full - parseInt(this.total_hours_full))*60;
      this.total_seconds_full = (this.total_hours_full - parseInt(this.total_hours_full))*60;
      this.values = {
          days : parseInt(this.total_days_full),
          hours  : parseInt(this.total_hours_full),
          minutes: parseInt(this.total_minutes_full),
          seconds: parseInt(this.total_seconds_full),
      };
      console.log(this.values);
      
      // Initialize total seconds
    //   this.total_seconds = this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;
  
      // Animate countdown to the end 
      this.count();    
    },
    
    count: function() {
      
      var that    = this,
          $day_1 = this.$.days.eq(0),
          $day_2 = this.$.days.eq(1),
          $day_3 = this.$.days.eq(2),
          $hour_1 = this.$.hours.eq(0),
          $hour_2 = this.$.hours.eq(1),
          $min_1  = this.$.minutes.eq(0),
          $min_2  = this.$.minutes.eq(1),
          $sec_1  = this.$.seconds.eq(0),
          $sec_2  = this.$.seconds.eq(1);
      
          this.countdown_interval = setInterval(function() {
  
          if(that.total_seconds > 0) {
  
              --that.values.seconds;              
  
              if(that.values.minutes >= 0 && that.values.seconds < 0) {
  
                  that.values.seconds = 59;
                  --that.values.minutes;
              }
  
              if(that.values.hours >= 0 && that.values.minutes < 0) {
  
                  that.values.minutes = 59;
                  --that.values.hours;
              }
  
              // Update DOM values
              // Days
              that.checkDay(that.values.days, $day_1, $day_2, $day_3);

              // Hours
              that.checkHour(that.values.hours, $hour_1, $hour_2);
  
              // Minutes
              that.checkHour(that.values.minutes, $min_1, $min_2);
  
              // Seconds
              that.checkHour(that.values.seconds, $sec_1, $sec_2);
  
              --that.total_seconds;
          }
          else {
              clearInterval(that.countdown_interval);
          }
      }, 1000);    
    },
    
    animateFigure: function($el, value) {
      
       var that         = this,
           $top         = $el.find('.top'),
           $bottom      = $el.find('.bottom'),
           $back_top    = $el.find('.top-back'),
           $back_bottom = $el.find('.bottom-back');
  
      // Before we begin, change the back value
      $back_top.find('span').html(value);
  
      // Also change the back bottom value
      $back_bottom.find('span').html(value);
  
      // Then animate
      TweenMax.to($top, 0.8, {
          rotationX           : '-180deg',
          transformPerspective: 300,
            ease                : Quart.easeOut,
          onComplete          : function() {
  
              $top.html(value);
  
              $bottom.html(value);
  
              TweenMax.set($top, { rotationX: 0 });
          }
      });
  
      TweenMax.to($back_top, 0.8, { 
          rotationX           : 0,
          transformPerspective: 300,
            ease                : Quart.easeOut, 
          clearProps          : 'all' 
      });    
    },
    

    checkDay: function(value, $el_1, $el_2, $el_3=0) {
      
        var val_1       = value.toString().charAt(0),
            val_2       = value.toString().charAt(1),
            val_3       = value.toString().charAt(2),
            fig_1_value = $el_1.find('.top').html(),
            fig_2_value = $el_2.find('.top').html(),
            fig_3_value = $el_3.find('.top').html();
  
        
        if(value >= 100) {
          if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
          if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
          if(fig_3_value !== val_3) this.animateFigure($el_3, val_3);
        }
        else if(value >= 10) {
    
            // Animate only if the figure has changed
            if(fig_1_value !== '0') this.animateFigure($el_1, 0);
            if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
            if(fig_3_value !== val_2) this.animateFigure($el_3, val_2);
        }
        else {
    
            // If we are under 10, replace first figure with 0
            if(fig_1_value !== '0') this.animateFigure($el_1, 0);
            if(fig_2_value !== '0') this.animateFigure($el_2, 0);
            if(fig_3_value !== val_1) this.animateFigure($el_3, val_1);
        }    
    },

    checkHour: function(value, $el_1, $el_2) {
      
      var val_1       = value.toString().charAt(0),
          val_2       = value.toString().charAt(1),
          fig_1_value = $el_1.find('.top').html(),
          fig_2_value = $el_2.find('.top').html();
        // console.log(val_1)
        // console.log(val_2)
      if(value >= 10) {
  
          // Animate only if the figure has changed
          if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
          if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
      }
      else {
  
          // If we are under 10, replace first figure with 0
          if(fig_1_value !== '0') this.animateFigure($el_1, 0);
          if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
      }    
    }
  };
  
  // Let's go !
  Countdown.init();