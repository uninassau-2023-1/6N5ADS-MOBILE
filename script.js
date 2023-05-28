var generatedPasswords = [];
var passwordTypeCount = {
    "SP": 0,
    "SG": 0,
    "SE": 0
};

function generatePassword(type) {
    var now = new Date();
    var year = now.getFullYear().toString().slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var day = ("0" + now.getDate()).slice(-2);

    var password = year + month + day + type;
    return password;
}

function updateReport() {
    var reportContainer = document.getElementById("report-container");
    var passwordTypeReport = document.getElementById("password-type-report");
    passwordTypeReport.innerHTML = "";

    for (var type in passwordTypeCount) {
        var listItem = document.createElement("li");
        var typeName = "";
        if (type === "SP") {
            typeName = "Senha Prioritária";
        } else if (type === "SG") {
            typeName = "Senha Geral";
        } else if (type === "SE") {
            typeName = "Senha de Exame";
        }
        listItem.textContent = typeName + ": " + passwordTypeCount[type];
        passwordTypeReport.appendChild(listItem);
    }
}

document.getElementById("button-container").addEventListener("click", function(event) {
    if (event.target && event.target.matches("button.button")) {
        var generatedPasswordInput = document.getElementById("generated-password");
        var generatedPasswordsList = document.getElementById("generated-passwords");
        var passwordScore = document.getElementById("password-score");

        var buttonId = event.target.id;
        var passwordType = "";
        if (buttonId === "prioritaria-button") {
            passwordType = "SP";
        } else if (buttonId === "geral-button") {
            passwordType = "SG";
        } else if (buttonId === "exame-button") {
            passwordType = "SE";
        }

        var password = generatePassword(passwordType);
        generatedPasswords.push(password);
        generatedPasswordInput.value = password;

        passwordTypeCount[passwordType]++;
        updateReport();

        var listItem = document.createElement("li");
        listItem.textContent = password;
        generatedPasswordsList.appendChild(listItem);

        passwordScore.textContent = "Total de Senhas: " + generatedPasswords.length;
    }
});
