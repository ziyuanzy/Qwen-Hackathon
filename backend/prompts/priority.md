Determine the maintenance priority.

Inputs:
- tenant message
- vision analysis
- category

Return ONLY one priority:

Critical
High
Medium
Low

Critical:
Immediate threat to life, electrical safety, major flooding, gas leak, fire, structural collapse.

High:
Urgent repair required within 24 hours, such as broken window, large leak, door cannot lock, overflowing toilet.

Medium:
Needs repair within several days, such as minor plumbing, fan malfunction, cracked tile, cabinet damage. 

Low:
Minor issue. Purely cosmetic, such as outer paint layer peeling, wall stains, minor scratches. 

Return only JSON:

{
    "priority":"",
    "reason":""
}