<script lang="ts">
    import '@tailwind';

    // Reactive state variables
    let schoolName: string = $state('');
    let school: any = $state(null);
    let isLoading: boolean = $state(false);
    let isUpdating: boolean = $state(false);
    let statusMessage: string = $state('');
    let isError: boolean = $state(false);

    // Display status message with auto-hide
    function showStatus(message: string, error: boolean = false) {
        statusMessage = message;
        isError = error;
        
        // Auto-hide message after 3 seconds
        setTimeout(() => {
            statusMessage = '';
        }, 3000);
    }

    // Fetch school data
    async function handleSubmit() {
        if (!schoolName.trim()) {
            showStatus('Please enter a school name', true);
            return;
        }

        isLoading = true;
        statusMessage = '';
        
        try {
            const response = await fetch('/api/mongoSchool', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ schoolName })
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (!result) {
                showStatus('School not found', true);
                return;
            }
            
            school = result;
            console.log('Retrieved school data:', school); // Log to see the structure with _id
            showStatus('School data loaded successfully');
        } catch (error) {
            console.error('Error:', error);
            showStatus('Failed to fetch school data', true);
        } finally {
            isLoading = false;
        }
    }

    // Update school data
    async function updateSchool() {
        if (!school) return;
        
        isUpdating = true;
        statusMessage = '';
        
        // Create a fresh copy of the current state of the school object
        // Include the MongoDB _id field which is essential for updates
        const updatedSchool = {
            _id: school._id, // Include the MongoDB ID
            School_name: school.School_name,
            Address: school.Address,
            City: school.City,
            State: school.State,
            Pincode: school.Pincode,
            CSI: school.CSI,
            route: school.route,
            slot: [...school.slot] // Create a fresh array copy
        };
        
        // Log updated school object with latest values
        console.log('Updated School Object (with _id):', updatedSchool);
        
        try {
            const response = await fetch('/api/updateSchoolMongo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSchool)
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            
            const result = await response.json();
            school = result; // Update with server response
            showStatus('School information updated successfully');
        } catch (error) {
            console.error('Update Error:', error);
            showStatus('Failed to update school information', true);
        } finally {
            isUpdating = false;
        }
    }

    // Add a new time slot
    function addTimeSlot() {
        if (school && school.slot) {
            school.slot = [...school.slot, ""];
        }
    }

    // Remove a time slot
    function removeTimeSlot(index: number) {
        if (school && school.slot) {
            school.slot = school.slot.filter((_: unknown, i: number) => i !== index);
        }
    }
</script>

<div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">School Information Management</h1>
    
    <!-- Status message display -->
    {#if statusMessage}
        <div class={`p-3 mb-4 rounded ${isError ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`}>
            {statusMessage}
        </div>
    {/if}
    
    <div class="mb-6 flex gap-2">
        <input 
            type="text" 
            bind:value={schoolName}
            placeholder="Enter school name"
            class="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <button 
            onclick={handleSubmit}
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            disabled={isLoading}
        >
            {isLoading ? 'Loading...' : 'Search'}
        </button>
    </div>

    {#if school}
        <div class="p-6 border rounded-lg shadow-md bg-white">
            <h2 class="text-xl font-bold mb-4">
                <span>School Details</span>
                {#if school._id}
                    <span class="text-sm font-normal text-gray-500 ml-2">ID: {school._id}</span>
                {/if}
            </h2>
            
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <span class="block text-sm font-medium text-gray-700">School Name</span>
                        <input 
                            type="text"
                            class="w-full p-2 border rounded"
                            bind:value={school.School_name}
                        />
                    </div>
                    
                    <div class="space-y-1">
                        <span class="block text-sm font-medium text-gray-700">Address</span>
                        <input 
                            type="text"
                            class="w-full p-2 border rounded"
                            bind:value={school.Address}
                        />
                    </div>
                    
                    <div class="space-y-1">
                        <span  class="block text-sm font-medium text-gray-700">City</span>
                        <input 
                            id="city"
                            type="text"
                            class="w-full p-2 border rounded"
                            bind:value={school.City}
                        />
                    </div>
                    
                    <div class="space-y-1">
                        <span class="block text-sm font-medium text-gray-700">State</span>
                        <input 
                            type="text"
                            class="w-full p-2 border rounded"
                            bind:value={school.State}
                        />
                    </div>
                    
                    <div class="space-y-1">
                        <span class="block text-sm font-medium text-gray-700">Pincode</span>
                        <input 
                            type="text"
                            class="w-full p-2 border rounded"
                            bind:value={school.Pincode}
                        />
                    </div>
                    
                    <div class="space-y-1">
                        <span class="block text-sm font-medium text-gray-700">CSI</span>
                        <input 
                            type="text"
                            class="w-full p-2 border rounded"
                            bind:value={school.CSI}
                        />
                    </div>
                </div>
                
                <div class="space-y-1">
                    <span class="block text-sm font-medium text-gray-700">Route</span>
                    <input 
                        type="text"
                        class="w-full p-2 border rounded"
                        bind:value={school.route}
                    />
                </div>
                
                <div class="space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="block text-sm font-medium text-gray-700">Time Slots</span>
                        <button 
                            onclick={addTimeSlot}
                            class="text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                            Add Slot
                        </button>
                    </div>
                    
                    {#if school.slot && school.slot.length > 0}
                        {#each school.slot as time, i}
                            <div class="flex items-center gap-2">
                                <input 
                                    type="text"
                                    class="flex-1 p-2 border rounded"
                                    bind:value={school.slot[i]}
                                />
                                <button 
                                    onclick={() => removeTimeSlot(i)}
                                    class="text-red-500 hover:text-red-700"
                                >
                                    ✕
                                </button>
                            </div>
                        {/each}
                    {:else}
                        <p class="text-gray-500 italic">No time slots available</p>
                    {/if}
                </div>
                
                <div class="flex justify-end mt-6">
                    <button 
                        onclick={updateSchool}
                        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Updating...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>