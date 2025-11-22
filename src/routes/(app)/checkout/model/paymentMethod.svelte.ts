/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 22/11/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 22/11/2025
 * Last change: initialize
 * 
*/

let paymentMethod = $state(1)

export function getPaymentMethod(){
    return paymentMethod;
}

export function updatePaymentMethod(newPaymentMethod: number){
    paymentMethod = newPaymentMethod;
}