export class Usuario {

    static fromFirebase({ uid, correo, nombre }): Usuario {
        return new Usuario(uid, nombre, correo);
    }

    constructor(
        public uid: string | null | undefined,
        public nombre: string,
        public correo: string
    ) { }
}