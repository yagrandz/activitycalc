class ActivityCalc {
	constructor(){
		this.f = {
			throne_room_level: $('#calc_throne_room_level'),
			food_dons_per_day: $('#calc_food_dons_per_day'),
			food_per_hour_chest: $('#calc_food_per_hour_chest'),
			food_per_hour: $('#calc_food_per_hour'),
			food_per_day: $('#calc_food_per_day'),
			season_length: $('#calc_season_length'),
			arena_raid_per_day: $('#calc_arena_raid_per_day'),
			arena_avg_medals_per_raid: $('#calc_arena_avg_medals_per_raid'),
			devourer_raid_per_day: $('#calc_devourer_raid_per_day'),
			devourer_avg_eyes_per_raid: $('#calc_devourer_avg_eyes_per_raid'),
			food_spending_balance_alert: $('#calc_food_spending_balance_alert'),
		};
		this.f.food_dons_per_day.click(this.onFoodPerHourChange.bind(this));
		this.f.food_per_hour.change(this.onFoodPerHourChange.bind(this));
		this.f.food_per_hour_chest.change(this.onFoodPerHourChange.bind(this));
		this.f.throne_room_level.change(this.calc.bind(this));
		this.f.season_length.change(this.calc.bind(this));
		this.f.arena_raid_per_day.change(this.calc.bind(this));
		this.f.arena_avg_medals_per_raid.change(this.calc.bind(this));
		this.f.devourer_raid_per_day.change(this.calc.bind(this));
		this.f.devourer_avg_eyes_per_raid.change(this.calc.bind(this));
		this.r = {
			food_per_day_text: $('#calc_food_per_day_text'),
			free_progressbar: $('#calc_free_progressbar'),
			free_progressbar_val: $('#calc_free_progressbar_val'),
			arena_progressbar: $('#calc_arena_progressbar'),
			arena_progressbar_val: $('#calc_arena_progressbar_val'),
			arena_food_spending: $('#calc_arena_food_spending'),
			arena_food_cost_per_day: $('#calc_arena_food_cost_per_day'),
			arena_food_cost_per_season: $('#calc_arena_food_cost_per_season'),
			arena_medals_reward_per_day: $('#calc_arena_medals_reward_per_day'),
			arena_medals_reward_per_season: $('#calc_arena_medals_reward_per_season'),
			devourer_progressbar: $('#calc_devourer_progressbar'),
			devourer_progressbar_val: $('#calc_devourer_progressbar_val'),
			devourer_food_spending: $('#calc_devourer_food_spending'),
			devourer_food_cost_per_day: $('#calc_devourer_food_cost_per_day'),
			devourer_food_cost_per_season: $('#calc_devourer_food_cost_per_season'),
			devourer_eyes_reward_per_day: $('#calc_devourer_eyes_reward_per_day'),
			devourer_eyes_reward_per_season: $('#calc_devourer_eyes_reward_per_season'),
		};
		$.get('base.json', this.onBaseLoad.bind(this));
	}
	
	onFoodPerHourChange(){
		var donation_val = this.base.Donations[this.f.throne_room_level.val()]['Food'],
		food_per_day = (parseInt(this.f.food_per_hour_chest.val())+parseInt(this.f.food_per_hour.val()))*24+(this.f.food_dons_per_day.find(':checked').val()*donation_val);
		this.f.food_per_day.val(food_per_day);
		this.r.food_per_day_text.html(food_per_day);
		
		this.calc();
	}
	
	onBaseLoad(base){
		this.base = base;
		this.calc();
	}
	
	calc(){
		var arena = this.base.Arena[this.f.throne_room_level.val()],
			arena_cost = arena.Food[0],
			season_length = parseInt(this.f.season_length.val()),
			arena_raid_per_day = parseInt(this.f.arena_raid_per_day.val()),
			arena_avg_medals_per_raid = parseInt(this.f.arena_avg_medals_per_raid.val()),
			food_per_day = parseInt(this.f.food_per_day.val()),
			arena_food_cost_per_day = 0,
			arena_food_cost_per_season = 0,
			arena_medals_reward_per_day = 0,
			arena_food_spending = 0,
			arena_food_cost_per_season = 0;
		for(var i=0; i<arena_raid_per_day;i++){
			if(typeof arena.Food[i] == 'number')
				arena_cost = arena.Food[i];
			arena_food_cost_per_day += arena_cost;
			arena_medals_reward_per_day += arena_avg_medals_per_raid;
		}
		arena_food_spending = Math.round(arena_food_cost_per_day/food_per_day*100, 2);
		arena_food_spending = arena_food_spending>=0?arena_food_spending:0;
		this.r.arena_food_spending.html(arena_food_spending+'%');
		this.r.arena_progressbar_val.html(arena_food_spending+'%');
		this.r.arena_progressbar.css({width:arena_food_spending+'%'});
		this.r.arena_food_cost_per_day.html(arena_food_cost_per_day);
		this.r.arena_food_cost_per_season.html(arena_food_cost_per_day*season_length);
		this.r.arena_medals_reward_per_day.html(arena_medals_reward_per_day);
		this.r.arena_medals_reward_per_season.html(arena_medals_reward_per_day*season_length);
		
		
		var devourer = this.base.Devourer[this.f.throne_room_level.val()],
			devourer_cost = devourer.Food[0],
			season_length = parseInt(this.f.season_length.val()),
			devourer_raid_per_day = parseInt(this.f.devourer_raid_per_day.val()),
			devourer_avg_eyes_per_raid = parseInt(this.f.devourer_avg_eyes_per_raid.val()),
			food_per_day = parseInt(this.f.food_per_day.val()),
			devourer_food_cost_per_day = 0,
			devourer_food_cost_per_season = 0,
			devourer_eyes_reward_per_day = 0,
			devourer_food_spending = 0,
			devourer_food_cost_per_season = 0;
		for(var i=0; i<devourer_raid_per_day;i++){
			if(typeof devourer.Food[i] == 'number')
				devourer_cost = devourer.Food[i];
			devourer_food_cost_per_day += devourer_cost;
			devourer_eyes_reward_per_day += devourer_avg_eyes_per_raid;
		}
		devourer_food_spending = Math.round(devourer_food_cost_per_day/food_per_day*100, 2);
		devourer_food_spending = devourer_food_spending>=0?devourer_food_spending:0;
		this.r.devourer_food_spending.html(devourer_food_spending+'%');
		this.r.devourer_progressbar_val.html(devourer_food_spending+'%');
		this.r.devourer_progressbar.css({width:devourer_food_spending+'%'});
		this.r.devourer_food_cost_per_day.html(devourer_food_cost_per_day);
		this.r.devourer_food_cost_per_season.html(devourer_food_cost_per_day*season_length);
		this.r.devourer_eyes_reward_per_day.html(devourer_eyes_reward_per_day);
		this.r.devourer_eyes_reward_per_season.html(devourer_eyes_reward_per_day*season_length);
		
		var summary_spending = arena_food_spending+devourer_food_spending,
			summary_food_cost = devourer_food_cost_per_day+arena_food_cost_per_day;
		if(summary_spending>100){
			this.r.arena_food_spending.css({color:'red'});
			this.r.devourer_food_spending.css({color:'red'});
			this.f.food_spending_balance_alert.slideDown('fast');
			this.r.free_progressbar_val.html('');
			this.r.free_progressbar.css({width:'0%'});
		}else{
			this.r.free_progressbar_val.html(food_per_day-summary_food_cost);
			this.r.free_progressbar.css({width:(100-summary_spending)+'%'});
			this.r.arena_food_spending.css({color:'inherit'});
			this.r.devourer_food_spending.css({color:'inherit'});
			this.f.food_spending_balance_alert.slideUp('fast');
		}
	}
	
	setSummary(summary){
		this.summary_fields.forEach((f, k)=>{
			if(f.is('.item_hours_premium, .item_hours')){
				f.html(this.formatTime(summary[k]));
			}else{
				f.html(summary[k]);
			}
		});
	}
	
}

$(document).ready(function(){
window.calcInstace = new ActivityCalc();
});