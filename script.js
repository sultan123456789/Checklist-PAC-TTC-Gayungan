<script>
    $(document).ready(function() {
        var savedData = []; // Variabel untuk menyimpan data tabel

        // Fungsi untuk menambahkan baris ke tabel
        function addRow(no, device) {
            return `
                <tr>
                    <td>${no}</td>
                    <td>${device}</td>
                    <td><input type="number" class="form-control temp"></td>
                    <td><input type="number" class="form-control hum"></td>
                    <td><input type="number" class="form-control comp"></td>
                    <td><input type="text" class="form-control status"></td>
                </tr>
            `;
        }

        // Memeriksa apakah ada data yang tersimpan di local storage saat halaman dimuat
        if (localStorage.getItem('savedData')) {
            savedData = JSON.parse(localStorage.getItem('savedData'));
            savedData.forEach(function(row) {
                $('#data-table tbody').append(addRow(row.no, row.device));
                $('#data-table tbody tr:last-child .temp').val(row.temp);
                $('#data-table tbody tr:last-child .hum').val(row.hum);
                $('#data-table tbody tr:last-child .comp').val(row.comp);
                $('#data-table tbody tr:last-child .status').val(row.status);
            });
        } else {
            // Menambahkan baris ke tabel berdasarkan data perangkat jika tidak ada data yang tersimpan
            const devices = [ "PAC A2 (1.1)", "PAC B1 (2.1)", "PAC B1 (2.2)","PAC B3 (2.4)","PAC B3 (2.5)","PAC B3 (2.6)","PAC C1 (3.1)","PAC C1 (3.2)","PAC C1 (3.4)","PAC C1 (3.5)","PAC C1 (3.6)","PAC C1 (3.8)","PAC C1 (3.9)","PAC C1 (3.10)","PAC C1 (3.11)","PAC C2 (3.12)","PAC C2 (3.13)","PAC C2 (3.14)","PAC D1 (4.1)","PAC D1 (4.2)","PAC D1 (4.4)","PAC D1 (4.5)","PAC D1 (4.6)","PAC D3 (4.8)","PAC D3 (4.9)","PAC D5 (4.11)","PAC D5 (4.12)","PAC E1 (5.3)","PAC E1 (5.4)","PAC E1 (5.5)","PAC E2 (5.1)","PAC E2 (5.2)","PAC E3 (5.7)","PAC E3 (5.8)","PAC F2 (6.5)","PAC F2 (6.6)","PAC F3 (6.8)","PAC F3 (6.9)","PAC F4 (6.10)","PAC F4 (6.11)","PAC F4 (6.12)","PAC F4 (6.13)","PAC F5 (6.14)","PAC F5 (6.15)","PAC F5 (6.16)","PAC F5 (6.17)","PAC F5 (6.18)", 
            "PAC Cont. E5 (5.1.54)", "PAC Cont. E5 (5.1.55)", "PAC Cont. E5 (5.1.56)", "PAC Cont. E5 (5.1.57)", "PAC Cont. E5 (5.1.58)", "PAC Cont. F1 (6.1.46)", "PAC Cont. F1 (6.1.47)", "PAC Cont. F1 (6.1.48)", "PAC Cont. F1 (6.1.49)", "PAC Cont. F1 (6.2.50)", "PAC Cont. F1 (6.2.51)", "PAC Cont. F1 (6.2.52)", "PAC Cont. F1 (6.2.53)"
            , "CONTAIMENT E5", "CONTAIMENT 1 F1", "CONTAIMENT 2 F1","RUANGAN A2", "RUANGAN A3", "RUANGAN A4", "RUANGAN B1", "RUANGAN B2", "RUANGAN B3", "RUANGAN C1", "RUANGAN C2", "RUANGAN D1", "RUANGAN D2", "RUANGAN D3", "RUANGAN D4", "RUANGAN D5", "RUANGAN E1", "RUANGAN E2", "RUANGAN E3", "RUANGAN E4", "RUANGAN E5", "RUANGAN F1",  "RUANGAN F2", "RUANGAN F3", "RUANGAN F4", "RUANGAN F5", "RUANGAN F6"
     
            ];
            devices.forEach((device, index) => {
                $('#data-table tbody').append(addRow(index + 1, device));
            });
        }

        // Mengumpulkan data dari tabel dan menyimpannya ke local storage
        function collectTableData() {
            savedData = []; // Reset savedData
            $("#data-table tbody tr").each(function() {
                var row = $(this);
                var rowData = {
                    no: row.find("td:nth-child(1)").text(),
                    device: row.find("td:nth-child(2)").text(),
                    temp: row.find(".temp").val(),
                    hum: row.find(".hum").val(),
                    comp: row.find(".comp").val(),
                    status:row.find(".status").val()
                };
                savedData.push(rowData);
            });
            // Menyimpan data ke local storage
            localStorage.setItem('savedData', JSON.stringify(savedData));
        }

        // Fungsi untuk mendapatkan tanggal dan waktu saat ini
        function getCurrentDateTime() {
            var currentDate = new Date().toLocaleDateString('en-US');
            var currentTime = new Date().toLocaleTimeString('en-US');
            return { date: currentDate, time: currentTime };
        }

        // Memperbarui tampilan tanggal dan waktu saat ini
        function updateCurrentDateTime() {
            var dateTime = getCurrentDateTime();
            $('#currentDate').text(dateTime.date);
            $('#currentTime').text(dateTime.time);
        }

        // Memperbarui tanggal dan waktu saat halaman dimuat
        updateCurrentDateTime();

        // Memperbarui tanggal dan waktu setiap menit
        setInterval(updateCurrentDateTime, 60000);

        // Tombol "Save Data" diklik
        $('#save-data').click(function() {
            collectTableData(); // Mengumpulkan dan menyimpan data
            console.log("Data saved", savedData); // Opsi untuk debugging
        });

        $('#download-txt').click(function() {
            downloadText(savedData, 'pac_data.txt');
        });

          $('#clear-data').click(function() {
            $('#data-table tbody').empty(); // Menghapus semua baris dari tabel
            savedData = []; // Mengosongkan savedData
            localStorage.removeItem('savedData'); // Menghapus data dari local storage
        });
        
        function downloadText(data, filename) {
            // Mendapatkan tanggal dan waktu saat ini
            var dateTime = getCurrentDateTime();
            // Menyusun data dalam format teks
            let textContent = `Summary Checklist TTC Gayungan\nDate: ${dateTime.date}\nTime: ${dateTime.time}\n\nNo/ PAC Device/ Temp (C)/ Hum (%)/ Comp/ Status\n`;
            data.forEach(function(row) {
                textContent += `${row.no}/ ${row.device}/ ${row.temp}/ ${row.hum}/ ${row.comp}/${row.status}\n`;
            });

            // Membuat Blob dari string teks
            var blob = new Blob([textContent], {type: "text/plain;charset=utf-8"});
        
            // Membuat link untuk pengunduhan
            var link = document.createElement("a");
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            
            // Membersihkan untuk menghindari kebocoran memori
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }

        // Autosave setiap 5 menit
        setInterval(collectTableData, 10);
    });
</script>