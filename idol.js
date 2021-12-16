function getContent(data, i) {
    return ` <tr>
            <td>${i+1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].age}</td>
            <td>${data[i].phoneNumber}</td>
             <td><img width="300" height="200" src="../image/${data[i].image}" crossOrigin="anonymous" alt="anh"></td>
            <td>${data[i].address}</td>
            <td>${data[i].type.name}</td>
            <td>
                <button onclick="editIdol(${data[i].id})">Edit</button>
            </td>
            <td>
                <button  onclick="removeIdol(${data[i].id})">Delete</button>
            </td>
        </tr>`
}
function getAll() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/idols`,
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += getContent(data, i)

            }
            $("#idol").html(content);
        }
    });
    event.preventDefault();
}

function addNewIdol() {
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/type",
        success:function (data){
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            document.getElementById('idolType').innerHTML = content;
        }
    });
    document.getElementById("addIdol").innerHTML = `<table>
        <tr>
            <td>Name:</td>
            <td><input type="text" id="idolName" placeholder="name"></td>
        </tr>
        <tr>
            <td>Age:</td>
            <td><input type="text" id="idolAge" placeholder="age"></td>
        </tr>
        <tr>
            <td>PhoneNumber:</td>
            <td><input type="text" id="idolPhoneNumber" placeholder="phoneNumber"></td>
        </tr>
         <tr>
            <td>Image:</td>
            <td><input type="file" id="idolImage" name="idolImage"></td>
        </tr>
          <tr>
            <td>Address:</td>
            <td><input type="text" id="idolAddress" placeholder="address"></td>
        </tr>
        <tr>
            <td>Type:</td>
            <td> <select id="idolType">
       
            </select></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="submit" value="Create" onclick="addNew()"></td>
        </tr>
    </table>`
}
function addNew() {
    let name = $('#idolName').val();
    let age = $('#idolAge').val();
    let phoneNumber = $('#idolPhoneNumber').val();
    let image = $('#idolImage')[0].files[0];
    let fd = new FormData();
    fd.append("file", image);
    let address = $('#idolAddress').val();
    let type = $('#idolType').val();
    let newIdol = {
        name : name,
        age : age,
        phoneNumber : phoneNumber,
        address : address,
        type : {
            id: type
        }
    };
    fd.append("newIdol", JSON.stringify(newIdol));
    $.ajax({
        url: "http://localhost:8080/idols",

        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        headers: {'Content-Type': undefined, 'Accept': 'application/json'},
        type: "POST",
        data: fd,
        enctype: 'multipart/form-data',
        success: getAll
    })
}
function removeIdol(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/idols/` + id,
        success: getAll
    });
    event.preventDefault();
}

function editIdol(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/idols/${id}`,

        success: function (idol){
            $.ajax({
                type:"GET",
                url:"http://localhost:8080/type",
                success:function (data){
                    let content = "";
                    for (let i = 0; i < data.length; i++) {
                        content += `<option value="${data[i].id}">${data[i].name}</option>`
                    }
                    document.getElementById('idolTypeEdit').innerHTML = content;
                }
            });
            $("#editIdol").html( `<table>
        <tr>
            <td><input type="hidden" id="id" value="${idol.id}"></td>
        </tr>
        <tr>
            <td>Name:</td>
            <td><input type="text" id="name" value="${idol.name}" placeholder="name"></td>
        </tr>
        <tr>
            <td>Age:</td>
            <td><input type="text" id="age" value="${idol.age}" placeholder="age"></td>
        </tr>
        <tr>
            <td>PhoneNumber:</td>
            <td><input type="text" id="phoneNumber" value="${idol.phoneNumber}" placeholder="phoneNumber"></td>
        </tr>
         <tr>
            <td>Image:</td>
            <td><input type="file" id="image" name="image"></td>
        </tr> 
            <tr>
            <td>Address:</td>
            <td><input type="text" id="address" value="${idol.address}" placeholder="address"></td>
        </tr>
        <tr>
            <td>Type:</td>
            <td> <select id="idolTypeEdit">
       
            </select></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="button" value="update" onclick="updateIdol()"></td>
        </tr>
    </table>`)
        }
    });
    event.preventDefault();
}
function updateIdol() {
    let id = $('#id').val();
    let name = $('#name').val();
    let age = $('#age').val();
    let phoneNumber = $('#phoneNumber').val();
    let image = $('#image')[0].files[0];
    let fd = new FormData();
    fd.append("file", image);
    let address = $('#address').val();
    let type = $('#idolTypeEdit').val();
    let newIdol = {
        id : id,
        name : name,
        age : age,
        phoneNumber : phoneNumber,
        image : image,
        address : address,
        type : {
            id: type
        }
    };
    fd.append("newIdol", JSON.stringify(newIdol));
    $.ajax({
        url: "http://localhost:8080/idols",
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false,
        headers: {'Content-Type': undefined ,'Accept': 'application/json'},
        type: "PUT",
        data: fd,
        enctype: 'multipart/form-data',
        success: getAll
    });
    event.preventDefault();
}