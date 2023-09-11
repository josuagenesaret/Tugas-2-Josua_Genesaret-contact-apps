// panggil fungsi readline 
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require('./storage');


// buat object kosong untuk menampung inputan 
let objectKontak = {
    nama: '',
    nomorHp: ''
}

function viewMenu() { //fungsi untuk menampilkan halaman menu
    console.log("Selamat Datang Di Aplikasi Kontak !");
    console.log("====================================\n");
    console.log("Main Menu :\n");
    console.log("1.Tambah Data \n");
    console.log("2.Lihat Data \n");
    console.log("3.Reset Data\n");
    console.log("4.Pencarian Data\n");
    console.log("5.Hapus Data \n");
    readline.question(`Silahkan Masukan Pilihan Anda  :`, input => {
        mainMenu(Number(input))
    });
}

function mainMenu(pilihan) { // fungsi untuk mengatur pilihan menu
    switch (pilihan) {
        case 1:
            simpan()
            break;
        case 2:
            lihatData()
            break;
        case 3:
            resetData()
            break;
        case 4:
            pencarianData()
            break;
        case 5:
            hapusData()
            break;
        default:
            console.log("Pilihan Tidak Valid !");
            readline.close()
            break;
    }
}

function simpan() { // fungsi untuk menyimpan data
    console.log("Silahkan Masukan Data ! : ");
    readline.question("Nama :", (nama) => {
        objectKontak.nama = nama
        console.log(`Input data berhasil ! :${nama}`);
        ambilInputanNomor()
    })

}

const ambilInputanNomor = () => { // fungsi untuk mengambil inputan nomor
    readline.question("Nomor :", (nomor) => {
        nomor = parseInt(nomor)
        objectKontak.nomorHp = nomor
        databaseKontak.push(Object.assign({}, objectKontak)) // insert data kedalam array databseKOntak
        kembali()
    })
}

const kembali = () => { // fungsi untuk navigasi kembali
    readline.question("Apakah Anda Ingin Kembali ? (y/n) :", (pilihan) => {
        if (pilihan === "y") {
            viewMenu()
        } else {
            readline.close()
        }

    })
}

function lihatData() { // fungsi untuk melihat list data
    console.table(databaseKontak);
    kembali()
}

function resetData() {
    databaseKontak.length = 0;
    console.log("Semua data berhasil direset");
    kembali()
}

function pencarianData() {
    readline.question("Masukkan nama yang ingin dicari: ", (nama) => {
        const hasilPencarian = databaseKontak.filter((kontak) =>
            kontak.nama.toLowerCase().includes(nama.toLowerCase())
        );
        if (hasilPencarian.length > 0) {
            console.log("Hasil Pencarian:");
            console.table(hasilPencarian);
        } else {
            console.log(`Data dengan ${nama} tidak ditemukan`);
        }
        kembali()
    });
}

function hapusData() {
    console.log("Daftar data yang tersedia: ");
    console.table(databaseKontak);

    readline.question("Masukan index data yang ingin dihapus: ", (index) => {
        index = parseInt(index)
        if (index >= 0 && index < databaseKontak.length) {
            const nama = databaseKontak[index].nama;
            databaseKontak.splice(index, 1);
            console.log(`Data ${nama} dengan index ${index} telah dihapus.`);
        } else {
            console.log(`Data dengan index ${index} tidak ditemukan`);
        }
        kembali();
    });
}

viewMenu() // panggil fungsi view menu untuk pertama kali