// types.ts
export interface User {
	name?: string;
	email?: string;
	password?: string;
	address?: Address;
	// ... outros campos
}

interface ServiceProvider {
	name: string;
	password: string;
	serviceType: string;
	price: number;
	addressId: number;
}

interface Address {
	state?: string;
	city?: string;
	street?: string;
	houseNumber?: number;
	additionalObservation?: string;
}

interface UserLogin {
	name: string;
	pass: string;
}

export { Address, ServiceProvider, UserLogin };

// Outros tipos, se necessário
