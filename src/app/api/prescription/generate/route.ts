import { NextRequest, NextResponse } from "next/server";

// Prescription PDF HTML template
function generatePrescriptionHTML(data: {
  prescriptionId: string;
  doctor: { name: string; specialization: string; license: string; council: string };
  patient: { name: string; age: number; gender: string; phone: string };
  medications: Array<{ name: string; dosage: string; frequency: string; duration: string; instructions: string }>;
  instructions: string;
  date: string;
  signatureUrl?: string;
}) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1A1A1A; padding: 40px; max-width: 800px; margin: 0 auto; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #2D6A4F; padding-bottom: 20px; margin-bottom: 20px; }
  .logo { font-family: Georgia, serif; font-size: 28px; font-weight: bold; color: #2D6A4F; }
  .logo-dot { color: #D4A853; }
  .rx-badge { background: #2D6A4F; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
  .section { margin-bottom: 20px; }
  .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #6B7280; margin-bottom: 8px; font-weight: 600; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
  .info-item label { font-size: 11px; color: #6B7280; display: block; margin-bottom: 2px; }
  .info-item p { font-size: 14px; font-weight: 500; }
  .med-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  .med-table th { background: #f0fdf4; padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: #2D6A4F; border-bottom: 2px solid #2D6A4F; }
  .med-table td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #E5E1D8; }
  .med-table tr:last-child td { border-bottom: none; }
  .instructions { background: #FFFDF8; border: 1px solid #E5E1D8; border-radius: 8px; padding: 15px; font-size: 13px; line-height: 1.6; color: #374151; }
  .signature-section { margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #E5E1D8; padding-top: 20px; }
  .signature-box { text-align: right; }
  .signature-img { height: 50px; margin-bottom: 5px; }
  .signature-name { font-family: Georgia, serif; font-style: italic; font-size: 16px; color: #2D6A4F; }
  .signature-details { font-size: 11px; color: #6B7280; }
  .verified { display: flex; align-items: center; gap: 5px; color: #2D6A4F; font-size: 12px; font-weight: 500; }
  .footer { margin-top: 30px; border-top: 1px solid #E5E1D8; padding-top: 15px; text-align: center; }
  .footer p { font-size: 10px; color: #9CA3AF; line-height: 1.5; }
  .disclaimer { background: #FEF3C7; border: 1px solid #FDE68A; border-radius: 6px; padding: 10px; font-size: 11px; color: #92400E; margin-top: 15px; }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">Sukhya<span class="logo-dot">.</span></div>
      <p style="font-size: 12px; color: #6B7280; margin-top: 4px;">Healthcare, redefined for real life.</p>
      <p style="font-size: 11px; color: #9CA3AF; margin-top: 2px;">www.sukhya.com | hello@sukhya.com</p>
    </div>
    <div style="text-align: right;">
      <span class="rx-badge">℞ E-PRESCRIPTION</span>
      <p style="font-size: 12px; color: #6B7280; margin-top: 8px;">ID: ${data.prescriptionId}</p>
      <p style="font-size: 12px; color: #6B7280;">Date: ${new Date(data.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
    </div>
  </div>

  <div class="section">
    <div class="info-grid">
      <div>
        <div class="section-title">Prescribing Doctor</div>
        <div class="info-item"><p>${data.doctor.name}</p></div>
        <div class="info-item"><label>Specialization</label><p>${data.doctor.specialization}</p></div>
        <div class="info-item"><label>Registration No.</label><p>${data.doctor.license}</p></div>
        <div class="info-item"><label>Medical Council</label><p>${data.doctor.council}</p></div>
      </div>
      <div>
        <div class="section-title">Patient Details</div>
        <div class="info-item"><p>${data.patient.name}</p></div>
        <div class="info-item"><label>Age / Gender</label><p>${data.patient.age} years / ${data.patient.gender}</p></div>
        <div class="info-item"><label>Contact</label><p>${data.patient.phone}</p></div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Prescribed Medications</div>
    <table class="med-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Medication</th>
          <th>Dosage</th>
          <th>Frequency</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        ${data.medications
          .map(
            (med, i) => `
        <tr>
          <td>${i + 1}</td>
          <td><strong>${med.name}</strong><br><span style="font-size:11px;color:#6B7280">${med.instructions}</span></td>
          <td>${med.dosage}</td>
          <td>${med.frequency}</td>
          <td>${med.duration}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <div class="section">
    <div class="section-title">General Instructions</div>
    <div class="instructions">${data.instructions}</div>
  </div>

  <div class="signature-section">
    <div class="verified">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      Digitally Verified
    </div>
    <div class="signature-box">
      ${data.signatureUrl ? `<img src="${data.signatureUrl}" class="signature-img" alt="Doctor signature" />` : '<div style="height:50px;width:150px;border-bottom:1px solid #1A1A1A;margin-bottom:5px;"></div>'}
      <div class="signature-name">${data.doctor.name}</div>
      <div class="signature-details">${data.doctor.specialization} | ${data.doctor.license}</div>
      <div class="signature-details">Signed: ${new Date(data.date).toLocaleString("en-IN")} IST</div>
    </div>
  </div>

  <div class="disclaimer">
    <strong>Important:</strong> This prescription is valid for 3 months from the date of issue. 
    Medications should be purchased from a licensed pharmacy. Do not self-adjust dosage. 
    Report any adverse effects immediately.
  </div>

  <div class="footer">
    <p>This is a digitally generated e-prescription from Sukhya Health Technologies Pvt. Ltd.</p>
    <p>Generated in compliance with Telemedicine Practice Guidelines (2020), Government of India.</p>
    <p>Sukhya is a telehealth platform and does not diagnose, treat, or dispense medications.</p>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const html = generatePrescriptionHTML(data);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `inline; filename="prescription-${data.prescriptionId}.html"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate prescription" }, { status: 500 });
  }
}
