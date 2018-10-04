import moment from 'moment'

export const required = v => !!v || 'Szükséges mező.'
export const min10char = v => {
    if (v === undefined) return !!v
    return v.length >= 10 || 'Legalább 10 karaktert kell tartalmazzon.'
}
export const isNumber = v => !isNaN(v) || 'Csak számokat tartalmazhat.'
export const dateNotInFuture = v => moment().isAfter(moment(v)) || 'Nem lehet a jövőben.'



/* Imei validator
** valid imei: 490154203237518
*/
export const isIMEI = v => {
    if (v === undefined) return !!v
    // Megnézzük, hogy megvan e a 15 db számjegy
    if (v.length != 15) return '15 számnak kell lennie'
    // Levágjuk az utlsó számjegyet a 15-ből és elrakjuk
    const validationDigit = Number(v.toString().split('').pop());
    // Végigmegyünk az összes számjegyen és minden másodikat megduplázzuk. (kivéve az utolsót)
    let checksum = ''
    for (let i = 0; i < v.length - 1; i++) {
        if (i % 2) checksum += v[i] * 2 
        else checksum += v[i]
    }
    // Végigmegyünk az összes checksum számjegyen és összeadjuk őket
    let sum = 0
    for (let i = 0; i < checksum.length; i++) {
    sum += Number(checksum[i])
    }
    // Felkerekítjük a legközelebb lévő 10-es számjegyre
    const roundedSum =  Math.ceil((sum+1) / 10) * 10;
    /* Kivonjuk a felkerekített számból az összeget és annak meg kell egyeznie az elején
    ** elrakott ellenörzőszámmal
    */
    if ((roundedSum - sum) === validationDigit) return true

    // Minden más esetben ezt küldjük vissza
    return 'Ez nem valid IMEI azonosító'

}
