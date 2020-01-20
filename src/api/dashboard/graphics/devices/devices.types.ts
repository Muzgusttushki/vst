const phone = ['BlackBerry', 'iOS',
    'Android 4.1.2 DROID RAZR Build',
    'Android', 'Windows Phone'];
const computer = ['Windows XP',
    'Windows NT', 'Chrome OS', 'Fedora', 'Windows Server 2008 / Vista',
    'Windows Server 2003 / XP 64-bit', 'Windows', 'Linux i686',
    'Linux', 'Ubuntu Chromium', 'Ubuntu', 'FreeBSD', 'OS X', 'Windows Server 2008 R2 / 7'];

export class devicesTypes {
    static get(name: string) {
        name = `${name}`;
        return phone.find(x => x.toLowerCase() == name.toLowerCase()) ? 0 :
            computer.find(x => x.toLowerCase() == name.toLowerCase()) ? 1 : 2
    }
}