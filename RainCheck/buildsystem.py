from os import listdir
from os.path import isfile, join
import mistune

Files = [ f for f in listdir(".") if isfile(join(".",f)) ]

for File in Files:
	if ".md" in File:
		MarkdownText = open(File, 'r').read()
		ParsedMarkdown = mistune.markdown(MarkdownText)

		HTMLFilename = File.replace("md", "html")
		HTMLText = open(HTMLFilename, 'r').read()

		StartString = "<!-- startcontent -->\n"
		EndString = "<!-- endcontent -->\n"

		Text = HTMLText[0:HTMLText.index(StartString) + len(StartString)] + ParsedMarkdown + HTMLText[HTMLText.index(EndString):]
		
		file = open(HTMLFilename, "w")
		file.write(Text)
		file.close()

		print("Converted " + File + " to markdown and injected into " + File.replace("md", "html"))