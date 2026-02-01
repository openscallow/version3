<script lang="ts">
	let { targetDate } = $props();

	// 1. Initialize state
	let timeRemaining = $state(getTimeRemaining(targetDate));

	// 2. Helper to calculate milliseconds left
	function getTimeRemaining(endTime: string) {
		const total = Date.parse(endTime) - Date.now();
		return Math.max(0, total);
	}

	// 3. The Effect: Runs once per component instance
	$effect(() => {
		// Update immediately to avoid 1-second delay
		timeRemaining = getTimeRemaining(targetDate);

		const interval = setInterval(() => {
			timeRemaining = getTimeRemaining(targetDate);
			
			// Stop timer if finished to save resources
			if (timeRemaining <= 0) {
				clearInterval(interval);
			}
		}, 1000);

		// Cleanup: If this promotion is removed from the list, kill the timer
		return () => clearInterval(interval);
	});

	// 4. Derived values (Math happens automatically when timeRemaining changes)
	let days = $derived(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
	let hours = $derived(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24));
	let minutes = $derived(Math.floor((timeRemaining / 1000 / 60) % 60));
	let seconds = $derived(Math.floor((timeRemaining / 1000) % 60));

	// 5. Formatting helper
	function pad(num: number) {
		return num.toString().padStart(2, '0');
	}
</script>

<div class="counter">
	<div class="unit">
		<span>{pad(days)}</span>
		<span>Day</span>
	</div>
	<div class="unit">
		<span>{pad(hours)}</span>
		<span>Hour</span>
	</div>
	<div class="unit">
		<span>{pad(minutes)}</span>
		<span>Minute</span>
	</div>
	<div class="unit">
		<span>{pad(seconds)}</span>
		<span>Second</span>
	</div>
</div>

<style>
    .counter {
        width:100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .counter .unit {
        display: flex;
        flex-direction: column;
    }

    div.unit span:nth-child(1){
         display: flex;
         align-items: center;
         justify-content:center; 
    }

    div.unit span:nth-child(2){  
        display: flex;
        justify-content:center; 
        font-size:0.7rem; 
    }
</style>