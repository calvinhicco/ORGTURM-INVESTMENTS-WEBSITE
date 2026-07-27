"""Generate Organic Turmeric Manual PDF for public download."""
from pathlib import Path
from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "scripts" / "organic-turmeric-manual-source.txt"
OUT = ROOT / "public" / "Organic-Turmeric-Manual.pdf"

HEADINGS = {
    "BACKGROUND",
    "SITE SELECTION AND CLIMATE",
    "LAND PREPARATION AND PLANTING",
    "IRRIGATION",
    "WEEDING AND FERTILIZER APPLICATION",
    "HARVESTING AND PACKAGING",
}


class ManualPDF(FPDF):
    def footer(self):
        self.set_y(-15)
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(90, 90, 90)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")


def clean(text: str) -> str:
    return (
        text.replace("–", "-")
        .replace("—", "-")
        .replace("°", " deg ")
        .replace("²", "2")
        .replace("€", "EUR ")
        .replace("\u00a0", " ")
    )


def write_line(pdf: ManualPDF, text: str, *, bold=False, size=10, color=(30, 30, 30), align="L", h=5):
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Helvetica", "B" if bold else "", size)
    pdf.set_text_color(*color)
    pdf.multi_cell(pdf.epw, h, text, align=align)


def main() -> None:
    raw = SRC.read_text(encoding="utf-8")
    lines = [clean(line.rstrip()) for line in raw.splitlines()]

    pdf = ManualPDF(format="A4")
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_page()
    pdf.set_margins(18, 18, 18)

    write_line(pdf, lines[0], bold=True, size=13, color=(40, 90, 50), align="C", h=7)
    pdf.ln(3)
    write_line(pdf, lines[1], bold=True, size=11, align="C", h=6)
    write_line(pdf, lines[2], size=10, align="C", h=5)
    pdf.ln(5)

    for line in lines[3:]:
        text = line.strip()
        if not text:
            continue

        if text in HEADINGS:
            pdf.ln(3)
            write_line(pdf, text, bold=True, size=11, color=(180, 90, 30), h=6)
            pdf.ln(1)
            continue

        if (
            text.startswith("For the National")
            or text.startswith("Jacob ")
            or text.startswith("Agroforestry")
            or text.startswith("00263")
            or text.startswith("29/")
        ):
            write_line(pdf, text, bold=text.startswith("Jacob"), size=10, h=5)
            continue

        write_line(pdf, text, size=10, h=5)
        pdf.ln(1)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
