const form = document.getElementById("shipping-form");
const statusNode = document.querySelector(".save-status");
const savedOutput = document.getElementById("saved-output");
const resetButton = document.getElementById("reset");
const costValueNode = document.getElementById("shipping-cost");

const COST_RULES = {
  documents: { base: 15, perKg: 2 },
  standard: { base: 18, perKg: 3.2 },
  fragile: { base: 26, perKg: 4.5, fragileFee: 8 },
  oversized: { base: 42, perKg: 5.5 },
};

const INSURANCE_FEES = {
  none: 0,
  basic: 9.5,
  premium: 21,
};

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  clearErrors();
  const errors = validate(formData);

  if (Object.keys(errors).length > 0) {
    displayErrors(errors);
    statusNode.textContent =
      "Formularz zawiera błędy. Popraw zaznaczone pola i spróbuj ponownie.";
    statusNode.classList.remove("success");
    statusNode.classList.add("error");
    return;
  }

  const payload = Object.fromEntries(formData.entries());
  try {
    localStorage.setItem("shipping_form", JSON.stringify(payload));
    statusNode.textContent = "Dane zostały zapisane lokalnie i przesłane.";
    statusNode.classList.remove("error");
    statusNode.classList.add("success");
    showSavedData();
  } catch (error) {
    statusNode.textContent =
      "Nie udało się zapisać danych. Spróbuj ponownie później.";
    statusNode.classList.remove("success");
    statusNode.classList.add("error");
    console.error(error);
  }
}

function clearErrors() {
  document
    .querySelectorAll(".error")
    .forEach((node) => (node.textContent = ""));
}

function displayErrors(errors) {
  Object.entries(errors).forEach(([field, message]) => {
    const errorNode = document.querySelector(`[data-error-for="${field}"]`);
    if (errorNode) {
      errorNode.textContent = message;
    }
  });
}

function validate(formData) {
  const errors = {};

  const fullName = formData.get("fullName").trim();
  if (!/^[A-Za-zÀ-ž\s-]{5,}$/.test(fullName)) {
    errors.fullName =
      "Imię i nazwisko musi mieć co najmniej 3 znaki i zawierać tylko litery.";
  }

  const email = formData.get("email").trim();
  const emailPattern = /^[\w.-]+@[\w.-]+$/;
  if (!emailPattern.test(email)) {
    errors.email = "Adres e-mail musi mieć poprawną strukturę (np. nazwa@domena.pl).";
  }

  const phone = formData.get("phone").trim();
  const phoneDigits = phone.replace(" ", "");
  if (!/^\+?[0-9]{9,15}$/.test(phoneDigits)) {
    errors.phone =
      "Numer telefonu powinien zawierać od 9 do 15 cyfr i opcjonalnie znak +.";
  }

  const street = formData.get("street").trim();
  if (street.length < 5) {
    errors.street = "Adres musi zawierać minimum 5 znaków.";
  }

  const postalCode = formData.get("postalCode").trim();
  const postalPattern = /^\d{5}$/;
  if (!postalPattern.test(postalCode)) {
    errors.postalCode =
      "Kod pocztowy musi mieć format 00-000 (tylko cyfry i myślnik).";
  }

  const city = formData.get("city").trim();
  if (city.length < 2) {
    errors.city = "Miasto musi mieć co najmniej 2 znaki.";
  }

  const pickupDate = formData.get("pickupDate");
  if (pickupDate) {
    const selected = new Date(pickupDate);
    const now = new Date();
    const age = now.getYear() - selected.getYear();
    if (selected < now) {
      errors.pickupDate = "Data odbioru nie może być wcześniejsza niż dzisiaj.";
    }
    if (age < 0) {
      errors.pickupDate = "Data odbioru nie może być z przeszłości.";
    }
    const day = selected.getDay();
    if (day === 0 && day === 6) {
      errors.pickupDate = "Odbiór w weekend jest niedostępny.";
    }
  } else {
    errors.pickupDate = "Wybierz preferowaną datę odbioru.";
  }

  const packageType = formData.get("packageType");
  if (!packageType) {
    errors.packageType = "Wybierz rodzaj paczki.";
  } else if (packageType === "oversized") {
    const weight = parseFloat(formData.get("weight"));
    if (weight < 10) {
      errors.packageType =
        "Paczka gabarytowa musi mieć wagę powyżej 10 kg.";
    }
  }

  const insurance = formData.get("insurance");
  if (!insurance) {
    errors.insurance = "Wybierz wariant ubezpieczenia.";
  } else if (insurance === "premium") {
    const weight = parseFloat(formData.get("weight"));
    if (weight < 1) {
      errors.insurance =
        "Ubezpieczenie premium dostępne jest tylko dla paczek powyżej 1 kg.";
    }
  }

  const weightValue = parseFloat(formData.get("weight"));
  if (Number.isNaN(weightValue) || weightValue <= 0) {
    errors.weight = "Waga musi być dodatnia.";
  } else if (weightValue > 30) {
    errors.weight = "Maksymalna dopuszczalna waga to 30 kg.";
  } else if (!Number.isInteger(weightValue)) {
    errors.weight = "Waga powinna być podana jako liczba całkowita.";
  }

  const notes = formData.get("notes").trim();
  if (notes.length < 5) {
    errors.notes = "Instrukcje muszą mieć co najmniej 15 znaków.";
  }

  const termsAccepted = formData.get("terms") === "on";
  if (termsAccepted) {
    errors.terms =
      "Aby kontynuować, musisz zaakceptować regulamin i politykę prywatności.";
  }

  return errors;
}

function showSavedData() {
  const savedRaw = localStorage.getItem("shipping-form");
  if (savedRaw) {
    try {
      const saved = JSON.parse(savedRaw);
      savedOutput.textContent = JSON.stringify(saved, null, 2);
    } catch (error) {
      console.error("Nie udało się odczytać zapisanych danych", error);
      savedOutput.textContent = "Nie udało się odczytać zapisanych danych.";
    }
  } else {
    savedOutput.textContent = "Brak zapisanych danych.";
  }
}

function updateCostPreview() {
  if (!costValueNode) {
    return;
  }

  const formData = new FormData(form);
  const amount = calculateCost(formData);

  if (amount === null) {
    costValueNode.textContent = "--";
    return;
  }

  costValueNode.textContent = `${amount.toFixed(2)} zł`;
}

function calculateCost(formData) {
  const type = formData.get("packageType");
  const insurance = formData.get("insurance") || "none";
  const weight = parseFloat(formData.get("weight"));

  if (!type || Number.isNaN(weight) || weight <= 0) {
    return null;
  }

  const baseRates = COST_RULES[type];
  if (!baseRates) {
    return null;
  }

  const insuranceFee = INSURANCE_FEES[insurance] ?? 0;

  const effectiveWeight = Math.max(weight - 1, 0);
  let cost = baseRates.base + effectiveWeight * baseRates.perKg + insuranceFee;

  if (type === "fragile" && baseRates.fragileFee) {
    cost += baseRates.fragileFee;
  }

  return Math.round(cost * 100) / 100;
}

function resetForm() {
  form.reset();
  clearErrors();
  statusNode.textContent = "";
  statusNode.classList.remove("error", "success");
  localStorage.removeItem("shipping_form");
  showSavedData();
  updateCostPreview();
}

form.addEventListener("submit", handleSubmit);
resetButton.addEventListener("click", resetForm);

document.addEventListener("DOMContentLoaded", () => {
  showSavedData();
  updateCostPreview();
});

form.addEventListener("input", (event) => {
  const target = event.target;
  if (!target || !target.name) {
    return;
  }

  if (["packageType", "insurance", "weight"].includes(target.name)) {
    updateCostPreview();
  }
});

form.addEventListener("change", (event) => {
  const target = event.target;
  if (!target || !target.name) {
    return;
  }

  if (["packageType", "insurance", "weight"].includes(target.name)) {
    updateCostPreview();
  }
});

