<script>
  /**
   * @typedef {Object} Props
   * @property {any} [steps]
   * @property {number} [currentStep]
   */

  /** @type {Props} */
  let { steps = [
    { label: 'Address', completed: true, link: '../adderss' },
    { label: 'Payment', completed: true, link: '#delivery' },
    { label: 'Order', completed: false, link: '#payment' },
  ], currentStep = $bindable(3) } = $props();
 let activeStep = $derived(steps[currentStep]);
 
 function handleStepClick(index) {
   if (index <= currentStep) {
     currentStep = index;
   }
 }
 </script>
 
 <div class="progress-container">
  {#each steps as step, index}
   <a href={step.link} class="step-link">
     <div class="step" class:completed={step.completed} class:active={index === currentStep}>
       <div class="step-circle">
         {#if step.completed}
           ✓
         {:else if index === currentStep}
           <!-- Empty circle for current step -->
         {:else}
           <span>{index + 1}</span>
         {/if}
       </div>
       <div class="step-text">{step.label}</div>
     </div>
   </a>
   {#if index < steps.length - 1}
     <div class="step-line" class:active={index < currentStep}></div>
   {/if}
  {/each}
 </div>
 
 <style>
 .progress-container {
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   max-width: 600px;
   margin-inline: auto;
   padding-top: 10px;
 }
 .step-link {
   text-decoration: none;
   color: inherit;
   flex: 1;
 }
 .step {
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 .step-circle {
   width: 30px;
   height: 30px;
   border-radius: 50%;
   border: 2px solid #ccc;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 14px;
   font-weight: bold;
   margin-bottom: 5px;
 }
 .step-text {
   font-size: 14px;
   color: #666;
 }
 .step.active .step-circle {
   border-color: #008080;
   color: #008080;
 }
 .step.active .step-text {
   color: #008080;
 }
 .step.completed .step-circle {
   background-color: #008080;
   border-color: #008080;
   color: white;
 }
 .step-line {
   flex-grow: 1;
   height: 2px;
   background-color: #ccc;
   margin: 0 10px;
 }
 .step-line.active {
   background-color: #008080;
 }
 </style>