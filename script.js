let selectedCats = [];
let validClowders = [];

function fetchData() {
  fetch("https://quantcats-bfc2a3b9cfdf.herokuapp.com/bag")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      generateImageCheckBox(data);
      generateTabularContainer();
    })
    .catch((error) => {
        $("#dialogTitle").html("OOPS! Something went wrong");
        $("#dialogContent").html(error);
        $("#dialogOverlay").removeClass("hidden");
    });
}

function handleOnChange(event, item) {
  const checkBoxVal = event.target.value;
  const index = selectedCats.indexOf(checkBoxVal);
  if (index === -1) {
    selectedCats.push(checkBoxVal);
  } else {
    selectedCats.splice(index, 1);
  }
  if (selectedCats.length === 3) {
    if (validateClowder()) {
      $("#dialogTitle").html("Congratulations!");
      $("#dialogContent").html("Those cats get along.");
      $("#dialogOverlay").removeClass("hidden");
      const validLength = validClowders.length;
      $(selectedCats).each((index, item) => {
        $(`#${item}`).prop("disabled", true);
        const img = `<img src="https://static.quantcast.com/catrancher/${item}.png" alt="cat Image" class="h-16 w-20"></img>`;
        $(`#cell_${validLength * selectedCats.length + index}`).html(img);
      });
      validClowders.push(selectedCats);
    } else {
      $("#dialogTitle").html("Sorry");
      $("#dialogContent").html("This is an invalid selection");
      $("#dialogOverlay").removeClass("hidden");
    }
  }
}

const validateClowder = () => {
  const validateCategory = validateStripes();
  return validateCategory && validateShape();
};

const validateShape = () => {
  const thirdChar = selectedCats[0].charAt(2);
  const sameShape = selectedCats.filter((cat) => cat.charAt(2) === thirdChar);
  if (sameShape.length === 3 || sameShape.length === 0) return true;
  if (sameShape.length > 1) {
    const tall = selectedCats.filter((cat) => cat.charAt(2) === "t");
    const short = selectedCats.filter((cat) => cat.charAt(2) === "s");
    return tall.length > 0 && (tall.length > short.length) ? false : true;
  }
};

const validateStripes = () => {
  const firstChar = selectedCats[0].charAt(0);
  const sameStripes = selectedCats.filter((cat) => cat.charAt(0) === firstChar);
  return sameStripes.length === 3 || sameStripes.length === 1;
};

const isChecked = (val) => {
  return selectedCats.includes(val);
};

function generateImageCheckBox(catData) {
  let list = "";
  $(catData.cats).each(function (index, item) {
    let isCheckedValue = isChecked(item.join(""));
    list += `<li><input type="checkbox" id=${item.join(
      ""
    )} class="peer hidden" value=${item.join("")} name=${item.join(
      ""
    )} onChange="handleOnChange(event,'${item.join(
      ""
    )}')"/><label for=${item.join(
      ""
    )} class="label-for-checkbox inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700" ><div class="block h-24 w-full"> <img class="h-full m-auto" src="https://static.quantcast.com/catrancher/${item.join(
      ""
    )}.png"></img> </div> </label> </li>`;
  });
  $("#imageCheckbox-holder").html(list);
}

function generateTabularContainer() {
  let table = "";
  $([...Array(12)]).each(function (index, item) {
    table += `<div class="p-2 border h-20 w-20" id="cell_${index}"> </div>`;
  });
  $("#table-holder").html(table);
}

$(document).ready(function () {
  const formattedDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  $("#date-holder").html(formattedDate);

  fetchData();

  $("#closeDialogBtn").click(function (event) {
    if (
      event.target === $("#closeDialogBtn")[0] ||
      event.target === $("#dialogOverlay")[0]
    ) {
      $("#dialogOverlay").addClass("hidden");
      $(selectedCats).each(function (index, item) {
        $(`#${item}`).prop("checked", false);
      });
      selectedCats = [];
    }
  });
});
