export default function redirectUserBasedOnState() {
    const userAddress = localStorage.getItem('institute_name');
    const product = sessionStorage.getItem('product')
    if(!userAddress) window.location.href = '../adderss';
    if(!product) window.location.href = '/'
}
