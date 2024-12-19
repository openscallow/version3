<script>
    import '@tailwind'
    import { MoveRight } from 'lucide-svelte'
	import {
		Timeline,
		TimelineItem,
		TimelineSeparator,
		TimelineDot,
		TimelineConnector,
		TimelineContent,
		TimelineOppositeContent
	} from 'svelte-vertical-timeline'

	let options = $state()

	let routes = {
		one: [
			{ time: '08:00 am', schoolIndex:123, school: 'ASHADEEP VIDHYALAY' },
			{ time: '09:00 am', schoolIndex:13, school: 'veer bhamasha' }
		],

		two: [
			{ time: '09:00 am', schoolIndex:13, school: 'veer bhamasha' },
			{ time: '08:00 am', schoolIndex:123, school: 'ASHADEEP VIDHYALAY' }		
		]
	}

	let selectedRoute = $state()

	$effect(()=>{
		console.log(selectedRoute)
		options = routes[selectedRoute]
	})
</script>
{#if !selectedRoute}
	<div class="flex justify-center">
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Select your route</span>
			</div>
			<select bind:value={selectedRoute} class="select select-bordered">
				<option disabled selected hidden></option>
			  	<option>one</option>
			  	<option>two</option>
			  	<option>three</option>
			  	<option>four</option>
			  	<option>five</option>
			</select>
		</label>
	</div>
{:else}
	<Timeline>
		{#each options as option}
			<TimelineItem>
				<TimelineOppositeContent slot="opposite-content">
					<p>{option.time}</p>
				</TimelineOppositeContent>
				<TimelineSeparator>
					<TimelineDot />
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent>
					<div class="collapse bg-base-200">
						<input type="radio" name="my-accordion-2"  />
                    	<div class="collapse-title text-xl font-medium">{option.school}</div>
                    	<div class="collapse-content">
							<a href="associate/{option.school}" rel="noopener noreferrer">
								<p><MoveRight /></p>
                        	</a>
						</div>
					</div>
				</TimelineContent>
			</TimelineItem>
		{/each}
	</Timeline>
{/if}



