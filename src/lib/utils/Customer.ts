/**
 * created by: Gautam mer (CEO)
 * created at: 18/12/2025
 * 
 * last edit by: Gautam mer (CEO)
 * edited at: 18/12/2025
 * last change: initialize
 * 
*/
interface CustomerData {
    i: string,
    r: string,
    cc: {
        B: number,
        U: number
    }
}

export class Customer {
    id: string | null = null
    referralCode: string | null = null

    constructor() {
        this.populateFromStorage()
    }

    private populateFromStorage(): void {
        // Browser-safe check
        if (typeof window === 'undefined' || !window.localStorage) return

        const customerData = localStorage.getItem('customer_correlated')
        if (!customerData) return

        try {
            const parsed = JSON.parse(customerData)
            this.id = parsed.i ?? null
            this.referralCode = parsed.r ?? null
        } catch {
            this.id = null
            this.referralCode = null
        }
    }

    get exists(): boolean {
        return Boolean(this.id)
    }

    get referral(): string | null {
        return this.referralCode
    }

    get ID(): string | null {
        return this.id
    }

    set setData(data:CustomerData) {
        // Browser-safe check
        if (typeof window === 'undefined' || !window.localStorage) return
        
        localStorage.setItem('customer_correlated', JSON.stringify(data))
    }
}