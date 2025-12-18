/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 17/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 17/12/2025
 * Last change: initialize
 * 
*/

export async function getOrdersById (customerId: string) {
    try {
        let response = await fetch('/api/orderHistory', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({customerId, }),
        });
    } catch (error) {
        
    }
}