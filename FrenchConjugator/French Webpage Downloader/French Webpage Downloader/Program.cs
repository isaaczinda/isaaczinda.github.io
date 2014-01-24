using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HtmlAgilityPack;
using System.IO;

namespace French_Webpage_Downloader
{
    class Program
    {
        static void SaveToFile(string Path, string Content)
        {
            // Write the string to a file.
            System.IO.StreamWriter file = new System.IO.StreamWriter(Path);
            file.WriteLine(Content);

            file.Close();
        }

        static void AppendToFile(string Path, string Content)
        {
            StreamWriter w = File.AppendText(Path);
            w.WriteLine(Content);
            w.Close();
        }

        static string FormatString(string ToFormat)
        {
            ToFormat = ToFormat.Replace("&icirc;", "i");
            ToFormat = ToFormat.Replace("&ucirc;", "u");
            ToFormat = ToFormat.Replace("&eacute;", "e");

            return ToFormat;
        }

        static void AppendToFile(string Verb, string Tense, string String)
        {
            AppendToFile(Verb + "/" + Tense + ".txt", String);

            //Console.WriteLine(String);
        }

        static void ParseAndSave(string Verb, string Tense, string ToParse)
        {
            Verb = FormatString(Verb);
            Tense = FormatString(Tense);
            ToParse = FormatString(ToParse);

            if (!Directory.Exists("" + Verb))
            {
                Directory.CreateDirectory("" + Verb);
            }

            for (int i = 0; ToParse.Contains("<br>"); i++)
            {
                

                int number = ToParse.IndexOf(Convert.ToChar("<"));
                if (number != -1)
                {

                    char[] copy = new char[number];

                    ToParse.CopyTo(0, copy, 0, number);

                    string final = new string(copy);
                    AppendToFile(Verb, Tense, final);

                    ToParse = ToParse.Remove(0, ToParse.IndexOf(Convert.ToChar("<")) + 4);
                }
            }
        }

        static void DownloadDataForVerb(string Verb)
        {
            HtmlWeb Webget = new HtmlWeb();
            HtmlDocument document = Webget.Load("http://conjf.cactus2000.de/showverb.en.php?verb=" + Verb);
            var Nodes = document.DocumentNode.SelectNodes("//div[@class='tima1' or @class='tima2'  or @class='tima3' or class='timz1' or @class='timz2'  or @class='timz3']");

            if (!Directory.Exists(Verb))
            {
                Directory.CreateDirectory(Verb);
            }
            else
            {
                DirectoryInfo dir = new DirectoryInfo(Verb);

                foreach (FileInfo fi in dir.GetFiles())
                {
                    fi.IsReadOnly = false;
                    fi.Delete();
                }
            }


            for (int i = 0; i < Nodes.Count; i++)
            {
                ParseAndSave(Verb, Nodes[i].InnerHtml, Nodes[i].NextSibling.NextSibling.InnerHtml);
            }
        }

        static void Main(string[] args)
        {
            System.IO.StreamReader file = new System.IO.StreamReader("VerbList.txt");
            int Read = 0;
            string Line;
            while ((Line = file.ReadLine()) != null)
            {
                Read++;
                //try
                //{
                    DownloadDataForVerb(Line);
                    Console.WriteLine("Downloaded '" + Line + "', " + Read);
                //}
                //catch
                //{
                //    Console.WriteLine("**failed to download '" + Line + "'**");
                //}
            }

            file.Close();
            Console.ReadKey();
        }
    }
}