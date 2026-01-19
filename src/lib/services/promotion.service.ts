export type Promotion = {
  promotion_id: number;
  code: string;
  descriptions: {
    en: string[];
    hi: string;
  };
  discount_type: 'percentage' | 'fixed';
  discount_value: string;
  max_discount_cap: string;
  status: 'eligible' | 'enrolled' | 'pending_verification' | 'qualified' | 'redeemed' | 'expired';
  enrolled_at: string | null;
  deadline_at: string | null;
  progress_count: number;
};

export async function getEligiblePromotionsByCustomerId(customerId: string): Promise<Promotion[]> {
    try {
        const response = await fetch(`/api/customers/${customerId}/promotions?status=eligible`, {
            method: "GET"
        });
        const items = await response.json();
        return items
    } catch (error) {
        console.log(error)
        return [];
    }
}

export async function getEnrolledPromotionsByCustomerId(customerId: string): Promise<Promotion[]> {
    try {
        const response = await fetch(`/api/customers/${customerId}/promotions?status=enrolled`, {
            method: "GET"
        });
        const items = await response.json();
        return items
    } catch (error) {
        console.log(error)
        return [];
    }
}

export async function qualifiedPromotionsByCustomerId(customerId: string): Promise<Promotion[]> {
    try {
        const response = await fetch(`/api/customers/${customerId}/promotions?status=qualified`, {
            method: "GET"
        });
        const items = await response.json();
        console.log(items, 'quelified')
        return items
    } catch (error) {
        console.log(error)
        return [];
    }
}

export async function enrollPromotionByCustomerId(customerId: string, promotionId: number): Promise<boolean> {
    try {
        const response = await fetch(`/api/customers/${customerId}/promotions/${promotionId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "enroll"
                })
            }
        );

        if (!response.ok) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
