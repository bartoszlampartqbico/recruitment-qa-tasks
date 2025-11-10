const companies = [
  {
    id: "aurora",
    name: "Aurora Logistics sp. z o.o.",
    nip: "5213891124",
    address: "ul. Przemysłowa 18, 02-123 Warszawa",
    contact: "kontakt@aurora-logistics.pl | +48 22 456 78 90",
    overdueInvoices: 6,
    overdueDays: 74,
  },
  {
    id: "greenbyte",
    name: "GreenByte S.A.",
    nip: "7781532207",
    address: "ul. Piotrkowska 203, 90-451 Łódź",
    contact: "finance@greenbyte.pl | +48 42 671 23 45",
    overdueInvoices: 3,
    overdueDays: 41,
  },
  {
    id: "nordic",
    name: "Nordic Furniture sp. k.",
    nip: "8992774145",
    address: "ul. Skandynawska 5, 53-334 Wrocław",
    contact: "biuro@nordicfurniture.pl | +48 71 312 44 55",
    overdueInvoices: 2,
    overdueDays: 120,
  },
  {
    id: "waveware",
    name: "WaveWare Technologies sp. z o.o.",
    nip: "1239870021",
    address: "al. Grunwaldzka 472, 80-309 Gdańsk",
    contact: "billing@waveware.pl | +48 58 600 14 38",
    overdueInvoices: 5,
    overdueDays: 55,
  },
];

const form = document.querySelector("#collection-form");
const companyList = document.querySelector("#company-list");
const companyDetails = document.querySelector("#company-details");
const previewCard = document.querySelector("#preview-card");
const previewContent = document.querySelector("#preview-content");
const previewButton = document.querySelector("#preview-button");
const closePreviewButton = document.querySelector("#close-preview");
const messageArea = document.querySelector("#message-area");

function renderCompanyOptions() {
  const fragment = document.createDocumentFragment();

  companies.forEach((company, index) => {
    const wrapper = document.createElement("label");
    wrapper.className = "company-option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "companyId";
    radio.value = company.id;
    radio.required = true;
    radio.setAttribute("aria-describedby", `${company.id}-info`);

    // Default select the first company to guide the flow.
    if (index === 0) {
      radio.checked = true;
    }

    radio.addEventListener("change", () => displayCompanyDetails(company.id));

    const details = document.createElement("div");
    details.className = "company-info";
    details.id = `${company.id}-info`;
    details.innerHTML = `
      <h3>${company.name}</h3>
      <p>NIP: ${company.nip}</p>
      <p>${company.address}</p>
      <p>${company.contact}</p>
    `;

    wrapper.append(radio, details);
    fragment.appendChild(wrapper);
  });

  companyList.appendChild(fragment);
  displayCompanyDetails(companies[0].id);
}

function displayCompanyDetails(companyId) {
  const company = companies.find((item) => item.id === companyId);

  if (!company) {
    companyDetails.innerHTML = "<p>Nie znaleziono danych firmy.</p>";
    return;
  }

  companyDetails.innerHTML = `
    <strong>${company.name}</strong>
    <p>NIP: ${company.nip}</p>
    <p>Adres: ${company.address}</p>
    <p>Kontakt: ${company.contact}</p>
    <p>Zaległe faktury: <strong>${company.overdueInvoices}</strong> | Najstarsza faktura: <strong>${company.overdueDays} dni</strong> po terminie</p>
  `;
}

function getSelectedCompany() {
  const selected = form.elements.companyId?.value;
  return companies.find((item) => item.id === selected);
}

function getSelectedAssets() {
  return Array.from(form.querySelectorAll('input[name="assets"]:checked')).map(
    (input) => input.value
  );
}

function validateForm() {
  const selectedCompany = getSelectedCompany();
  const debtAmount = form.elements.debtAmount.value;
  const agencyName = form.elements.agencyName.value.trim();

  if (!selectedCompany) {
    return { valid: false, message: "Wybierz firmę do przekazania." };
  }

  if (!debtAmount || Number(debtAmount) <= 0) {
    return {
      valid: false,
      message: "Kwota zadłużenia musi być większa od zera.",
    };
  }

  if (!agencyName) {
    return {
      valid: false,
      message: "Podaj nazwę firmy windykacyjnej.",
    };
  }

  return { valid: true };
}

function buildPreviewData() {
  const company = getSelectedCompany();
  const assets = getSelectedAssets();

  return {
    "Firma dłużnika": company?.name ?? "-",
    "Kwota zadłużenia": form.elements.debtAmount.value
      ? `${Number(form.elements.debtAmount.value).toFixed(2)} PLN`
      : "-",
    "Numer umowy / faktury": form.elements.debtReference.value || "-",
    "Zajęte zasoby": assets.length ? assets.join(", ") : "Brak",
    "Uwagi dla analityka": form.elements.debtNotes.value || "Brak",
    "Firma windykacyjna": form.elements.agencyName.value || "-",
    "Osoba kontaktowa": form.elements.contactPerson.value || "-",
    "Preferowany kontakt": form.elements.contactMethod.value || "Nie wybrano",
    "Planowana data": form.elements.collectionStart.value || "Nie wskazano",
    "Załączniki": form.elements.attachments.value || "Brak",
  };
}

function renderPreview() {
  const data = buildPreviewData();
  previewContent.innerHTML = "";

  Object.entries(data).forEach(([label, value]) => {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    previewContent.append(dt, dd);
  });
}

function showMessage(type, text) {
  messageArea.className = type;
  messageArea.textContent = text;
}

function clearMessage() {
  messageArea.textContent = "";
  messageArea.className = "";
}

renderCompanyOptions();

previewButton.addEventListener("click", () => {
  const validation = validateForm();
  if (!validation.valid) {
    showMessage("error", validation.message);
    previewCard.hidden = true;
    return;
  }

  clearMessage();
  renderPreview();
  previewCard.hidden = false;
  previewCard.scrollIntoView({ behavior: "smooth" });
});

closePreviewButton.addEventListener("click", () => {
  previewCard.hidden = true;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const validation = validateForm();

  if (!validation.valid) {
    showMessage("error", validation.message);
    previewCard.hidden = true;
    return;
  }

  renderPreview();
  previewCard.hidden = false;
  showMessage("success", "Zgłoszenie zostało zarejestrowane (symulacja).");
  form.querySelector('button[type="submit"]').blur();
});

