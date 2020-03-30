import { Photo } from './Photo';

export interface Value {
    id: number;
    mark: string;
    model: string;
    year: string;
    engineCapacity: string;
    photos: Photo[];
    photoUrl: string;
    price: number;
    describe: string;
    fuelType: string;
    color: string;
    numberOfDoors: number;
    mileage: number;
}
