export class IngresoEgreso {


    

    constructor(
        public description: string,
        public monto: number,
        public tipo: string,
        public docId?: string | null,
    ) { }
}