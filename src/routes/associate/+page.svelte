<script>
    import '@tailwind'
    import { MoveRight } from 'lucide-svelte';
	import {
		Timeline,
		TimelineItem,
		TimelineSeparator,
		TimelineDot,
		TimelineConnector,
		TimelineContent,
		TimelineOppositeContent
	} from 'svelte-vertical-timeline';

	const options = [
		{ time: '08:00 am', schoolIndex:123, school: 'ASHADEEP VIDHYALAY' },
		{ time: '09:00 am', schoolIndex:13, school: 'veer bhamasha' },

	];
</script>

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


