'use client'
import jsPDF from 'jspdf'
import { SITE } from '@/lib/site-config'

// Minimal professional palette — navy accent + neutral grays only.
const NAVY = [15, 36, 71]
const DARK = [15, 23, 42]
const MID = [71, 85, 105]
const GREY = [100, 116, 139]
const LIGHT = [241, 245, 249]
const BORDER = [226, 232, 240]

function hline(doc, y, color = BORDER, w = 0.3) {
  doc.setDrawColor(...color); doc.setLineWidth(w)
  doc.line(15, y, 195, y)
}

function drawBrandMark(doc, x, y) {
  doc.setDrawColor(245, 180, 0); doc.setLineWidth(0.8)
  for (let i = 0; i < 8; i++) {
    const angle = (i * 45 - 90) * Math.PI / 180
    doc.line(x + 7 + Math.cos(angle) * 4, y + 6 + Math.sin(angle) * 4, x + 7 + Math.cos(angle) * 6.5, y + 6 + Math.sin(angle) * 6.5)
  }
  doc.setFillColor(245, 180, 0); doc.circle(x + 7, y + 6, 2.8, 'F')
  doc.setFillColor(30, 58, 138); doc.rect(x + 1, y + 10, 13, 8, 'F')
  doc.setDrawColor(59, 130, 246); doc.setLineWidth(0.25)
  doc.line(x + 1, y + 14, x + 14, y + 14); doc.line(x + 5.5, y + 10, x + 5.5, y + 18); doc.line(x + 10, y + 10, x + 10, y + 18)
  doc.setFillColor(245, 180, 0); doc.triangle(x + 15, y + 10, x + 12, y + 16, x + 15, y + 16, 'F')
}

export function generateQuotePDF({ customer, input, result }) {
  const doc = new jsPDF('p', 'mm', 'a4')
  const W = 210, H = 297

  // ===== Top brand strip (thin) =====
  doc.setFillColor(...NAVY); doc.rect(0, 0, W, 6, 'F')

  // ===== Header =====
  let y = 16
  drawBrandMark(doc, 15, 9)
  doc.setTextColor(...NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(16)
  doc.text('URJAA SOLAR ENERGY', 32, y)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor(...MID)
  doc.text(`Proprietor: ${SITE.founderFullName}  |  Est. ${SITE.established}  |  ${SITE.constitution}`, 32, y + 4.5)
  doc.setFontSize(8); doc.text(`GSTIN: ${SITE.gstin}`, 32, y + 8.5)

  // Right block
  doc.setFontSize(8.5); doc.setTextColor(...DARK)
  doc.text(SITE.website, W - 15, y, { align: 'right' })
  doc.text(SITE.phone, W - 15, y + 4.5, { align: 'right' })
  doc.text(SITE.email, W - 15, y + 8.5, { align: 'right' })
  doc.setFontSize(7.5); doc.setTextColor(...GREY)
  doc.text(`${SITE.address.line2}, ${SITE.address.district}, ${SITE.address.state} - ${SITE.address.pin}`, W - 15, y + 12.5, { align: 'right' })

  y += 20
  hline(doc, y); y += 8

  // ===== Title =====
  doc.setTextColor(...DARK); doc.setFont('helvetica', 'bold'); doc.setFontSize(18)
  doc.text('Solar System Quotation', 15, y)
  y += 6
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  const quoteId = 'URJ-' + Date.now().toString().slice(-8)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...GREY)
  doc.text(`Quotation No.: ${quoteId}`, 15, y)
  doc.text(`Date: ${today}`, 105, y)
  doc.text(`Validity: 30 days`, 165, y)
  y += 8

  // ===== Customer & Site Details (two columns) =====
  doc.setFillColor(...LIGHT); doc.rect(15, y, 180, 26, 'F')
  doc.setDrawColor(...BORDER); doc.setLineWidth(0.2); doc.rect(15, y, 180, 26)

  doc.setFont('helvetica', 'bold'); doc.setFontSize(8); doc.setTextColor(...GREY)
  doc.text('BILL TO', 20, y + 6)
  doc.text('SITE DETAILS', 110, y + 6)

  doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...DARK)
  doc.text(customer.name || 'Prospective Customer', 20, y + 12)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...MID)
  doc.text(`${customer.phone || ''}`, 20, y + 17)
  if (customer.email) doc.text(customer.email, 20, y + 22)

  doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(...DARK)
  doc.text(`${input.city || ''}${input.state ? ', ' + input.state : ''}`, 110, y + 12)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...MID)
  doc.text(`Category: ${(input.consumerType || 'residential').replace(/^\w/, c => c.toUpperCase())}`, 110, y + 17)
  doc.text(`Roof Type: ${input.roofType || 'RCC'}`, 110, y + 22)

  y += 34

  // ===== Recommended System (table style) =====
  doc.setTextColor(...NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(11)
  doc.text('1. Proposed System Specification', 15, y); y += 5
  hline(doc, y); y += 6

  const specs = [
    ['System Capacity', `${result.kw} kW`],
    ['System Type', 'On-grid rooftop (net-metered)'],
    ['Estimated Roof Area Required', `${Math.round(result.kw * 100)} sqft`],
    ['Estimated Annual Generation', `${result.annualUnits.toLocaleString('en-IN')} kWh`],
    ['Panel Type', 'Mono-PERC / Bi-facial, Tier-1 grade'],
    ['Inverter', 'MNRE-approved string inverter'],
    ['Mounting Structure', 'Hot-dip galvanised iron, wind-load certified'],
  ]
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5)
  specs.forEach(([k, v]) => {
    doc.setTextColor(...MID); doc.text(k, 20, y)
    doc.setTextColor(...DARK); doc.setFont('helvetica', 'bold'); doc.text(v, 195, y, { align: 'right' })
    doc.setFont('helvetica', 'normal')
    y += 6
  })
  y += 3

  // ===== Investment Breakdown =====
  doc.setTextColor(...NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(11)
  doc.text('2. Investment Breakdown', 15, y); y += 5
  hline(doc, y); y += 6

  const rows = [
    ['Gross Project Cost (incl. materials, installation, taxes)', `INR ${result.grossCost.toLocaleString('en-IN')}`, false],
    ['Less: PM Surya Ghar Subsidy (residential, if applicable)', `- INR ${result.subsidy.toLocaleString('en-IN')}`, false],
    ['Net Investment', `INR ${result.netCost.toLocaleString('en-IN')}`, true],
  ]
  rows.forEach(([lbl, val, bold]) => {
    doc.setTextColor(...(bold ? NAVY : MID))
    doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(bold ? 10.5 : 9.5)
    doc.text(lbl, 20, y)
    doc.setTextColor(...(bold ? NAVY : DARK))
    doc.text(val, 195, y, { align: 'right' })
    y += bold ? 8 : 6
    if (bold) hline(doc, y - 3)
  })
  y += 4

  // ===== Savings Projection =====
  doc.setTextColor(...NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(11)
  doc.text('3. Estimated Savings', 15, y); y += 5
  hline(doc, y); y += 6

  const savRows = [
    ['Estimated Monthly Savings', `INR ${result.monthlySavings.toLocaleString('en-IN')}`],
    ['Estimated Annual Savings (Year 1)', `INR ${result.annualSavings.toLocaleString('en-IN')}`],
    ['Simple Payback Period', `${result.payback} years`],
    ['25-Year Cumulative Savings (2% annual tariff escalation)', `INR ${result.twentyFiveYearSavings.toLocaleString('en-IN')}`],
    ['Annual CO2 Offset', `${(result.co2Kg / 1000).toFixed(1)} tonnes`],
  ]
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5)
  savRows.forEach(([k, v]) => {
    doc.setTextColor(...MID); doc.text(k, 20, y)
    doc.setTextColor(...DARK); doc.setFont('helvetica', 'bold'); doc.text(v, 195, y, { align: 'right' })
    doc.setFont('helvetica', 'normal')
    y += 6
  })
  y += 3

  // ===== Scope of Supply =====
  doc.setTextColor(...NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(11)
  doc.text('4. Scope of Supply & Services', 15, y); y += 5
  hline(doc, y); y += 6
  const scope = [
    'Supply of solar PV modules, string inverter, mounting structure, cables and BOS',
    'Complete installation, commissioning and testing',
    'Assistance with PM Surya Ghar subsidy registration and documentation',
    'Net-metering application coordination with local DISCOM',
    'Free site survey, structural check and shadow analysis',
    'Manufacturer warranty documentation and handover',
  ]
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(...DARK)
  scope.forEach(item => {
    doc.text('•', 20, y); doc.text(item, 24, y, { maxWidth: 170 })
    y += 5.5
  })
  y += 2

  // ===== Warranty =====
  if (y > 240) { doc.addPage(); y = 20 }
  doc.setTextColor(...NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(11)
  doc.text('5. Warranty & Support', 15, y); y += 5
  hline(doc, y); y += 6
  const warr = [
    ['Solar Panels', 'Manufacturer standard (typically 10-yr product, 25-yr performance)'],
    ['Inverter', 'Manufacturer standard (typically 5-10 years)'],
    ['Installation Workmanship', '1 year from date of commissioning'],
    ['Free Site Visit After Installation', '2 visits within first year'],
  ]
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5)
  warr.forEach(([k, v]) => {
    doc.setTextColor(...MID); doc.text(k, 20, y)
    doc.setTextColor(...DARK); doc.text(v, 195, y, { align: 'right' })
    y += 6
  })
  y += 4

  // ===== Terms =====
  if (y > 240) { doc.addPage(); y = 20 }
  doc.setTextColor(...NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(11)
  doc.text('6. Assumptions & Terms', 15, y); y += 5
  hline(doc, y); y += 6
  doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor(...MID)
  const terms = [
    `Estimates are based on customer-provided monthly bill of INR ${input.monthlyBill?.toLocaleString('en-IN') || '-'} and roof area of ${input.roofArea || '-'} sqft.`,
    'Actual system size, generation and savings depend on site survey (shadow-free area, tilt, orientation), local weather and DISCOM tariff.',
    'PM Surya Ghar subsidy is applicable to eligible residential consumers only and is disbursed by MNRE as per current guidelines.',
    'Prices are indicative and subject to final BOQ after physical site survey. Formal quotation supersedes this estimate.',
    'This document is an estimate and does not constitute a binding offer.',
  ]
  terms.forEach(t => { const lines = doc.splitTextToSize(t, 175); lines.forEach(l => { doc.text('• ' + l, 20, y); y += 4.5 }); y += 0.5 })
  y += 4

  // ===== Sign-off / CTA =====
  if (y > 250) { doc.addPage(); y = 20 }
  doc.setFillColor(...LIGHT); doc.rect(15, y, 180, 26, 'F')
  doc.setDrawColor(...BORDER); doc.rect(15, y, 180, 26)
  doc.setTextColor(...NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(11)
  doc.text('Next Steps', 20, y + 8)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...MID)
  doc.text('To proceed with a formal quotation, please schedule a free site survey.', 20, y + 14)
  doc.setTextColor(...DARK); doc.setFont('helvetica', 'bold'); doc.setFontSize(9.5)
  doc.text(`Call ${SITE.phone}   |   WhatsApp ${SITE.phone}   |   ${SITE.email}`, 20, y + 21)
  y += 32

  // ===== Footer =====
  const footY = H - 14
  hline(doc, footY - 4)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7); doc.setTextColor(...GREY)
  doc.text(`${SITE.legalName} | GSTIN ${SITE.gstin} | Est. ${SITE.established} | ${SITE.website}`, 15, footY)
  doc.text(`Prepared by: ${SITE.founderFullName}, ${SITE.founderTitle}`, W - 15, footY, { align: 'right' })

  const fname = `Urjaa-Solar-Quotation-${(customer.name || 'Customer').replace(/\s+/g, '_')}-${quoteId}.pdf`
  doc.save(fname)
  return { quoteId, fname }
}
