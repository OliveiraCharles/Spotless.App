// types.ts

interface User {
	uid?: string;
	name?: string;
	displayName?: string;
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
	uid?: string;
	password?: string;
	displayName?: string;
	email?: string;
}

export { User, Address, ServiceProvider, UserLogin };

// Outros tipos, se necessário
