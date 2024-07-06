# One-Tap login

One-Tap adalah cara mudah login dengan SSO pada domain yang berbeda (dengan akun terintegrasi pada layanan utama)

Ini mirip dengan Google one-tap login tapi versi lebih sederhananya

![One-Tap Login Google](/docs/assets/img/one-tap-ui-fedcm.png)

[One-Tap Login Google](https://developers.google.com/identity/gsi/web/guides/display-google-one-tap)

## How it works

Salah satu Pihak ketiga (dalam kasus ini <code>app1</code>) menambahkan sebuah elemen placeholder
pada halaman login mereka dan sebuah tag <code>script</code>

> Note: dalam kasus biasa ini domain pihak ketiga harus terdaftar pada layanan utama, agar script yang dipanggil tidak terkena cross-origin resource sharing (CORS)

<code>script</code> yang dipanggil pada <code>app1</code> berguna untuk merender elemen iframe pada elemen placeholder

dan iframe ini berisi halaman daftar akun yang tercatat pada cookies domain layanan utama, 
> Note: dikarenakan cookie tidak bisa di share lintas domain, maka cara untuk menampilkan data cookies dalam contoh ini yaitu daftar pengguna yang sudah login pada perangkat

Tentu saja ini repository ini hanya menjelaskan bagaimana membagikan cookie pada domain yang berbeda, tahapan berikutnya yang tidak ada pada repository ini adalah bagaimana:
- jika salah satu akun (pada daftar akun pada iframe) diklik
- apa yang akan terjadi pada domain ``app1``

Kedepannya jika salah satu akun diklik, pengguna akan diarahkan ke halaman konfirmasi login dengan akun tersebut (domain layanan utama).

Berikutnya layanan utama akan melakukan redirect ke webhook url yang dilampirkan pada ``app1`` dengan parameter login yang dibutuhkan seperti email, dan beberapa data yang dicustom

> Ini bisa dijelaskan pada 
[Dokumentasi One-Tap Login Google](https://developers.google.com/identity/gsi/web/guides/display-google-one-tap) dimana pada element placeholder terdapat beberapa parameter penting seperti pada contoh dibawah

```html
<div id="g_id_onload"
     data-client_id="YOUR_GOOGLE_CLIENT_ID"
     data-login_uri="https://your.domain/your_login_endpoint"
     data-your_own_param_1_to_login="any_value"
     data-your_own_param_2_to_login="any_value">
</div>
```

## Keamanan

repository ini tidak menerapkan keaamanan, tapi untuk improve keaamanan dapat dilakukan dengan:

- enkripsi cookie
- menerapkan origin pada layanan utama
- menerapkan client id atau token unik pada placeholder atau script js, seperti yang dilakukan oleh google

## Start App

Untuk menjalankan applikasi ini:

### pada linux

jalankan file bash dengan nama ``start.sh``

```bash
./start.sh
```

### pada windows

jalankan file bash dengan nama ``start.bat``

```bash
./start.bat
```

ini akan menjalankan app pada:
- localhost:3000 sebagai ``layanan utama``
- localhost:4000 sebagai ``app1``
- localhost:5000 sebagai ``app2``