using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class Scale
    {
        //public static string TranLine(string line, string transpose)
        //{
        //    int[] counts=new int[line.Length];
        //    char[] kings=new char[line.Length];
        //    string[] chords=new string[line.Length];
        //    int k=0;
        //    for (int i = 0; i < line.Length; i++)
        //    {
        //        while (i < line.Length && line[i] == ' ')


        //    }
        //    //1,1,19,2,1
        //    //s,c,s,c,s
        //    // ,G, ,Cm, 

        //    //1,1,18,3,1
        //    //s,c,s,c,s
        //    // ,G, ,C#m, 

        //    // G                   Cm 
        //    //1 - space
        //    //1 - chord
        //    //19 - space
        //    //2 - chord
        //    //1 - space
        //    // G                  C#m 
        //    //1 - space
        //    //1 - chord
        //    //18 - space
        //    //3 - chord
        //    //1 - space
        //    // Ab                  C#m 
        //    //1 - space
        //    //2 - chord
        //    //18 - space
        //    //3 - chord
        //    //1 - space

        //}

        //public static string TranSong(string lyrics, string transpose)
        //{
        //    //string[] lines = lyrics.Split('\n');
        //    //string[] chords = GetChords(lyrics);
        //    //string[] replacements = UpArr(chords, transpose);
        //    //string tranlyrics = "";
        //    ////for (int i = 0; i < chords.Length; i++)
        //    ////{
        //    ////    if (chords[i].Length > replacements.Length)
        //    ////        replacements[i] = "-" + replacements[i];
        //    ////    else if(chords[i].Length < replacements.Length)
        //    ////        replacements[i] = "+" + replacements[i];
        //    ////}
        //    //int k = chords.Length-1;
        //    if (lyrics == null)
        //        return null;

        //    bool finish = false;
        //    string ch = "", tranlyrics = "", newChord = "";
        //    for (int i = lyrics.Length - 1; i >= 0; i--)
        //    {

        //        if (lyrics[i] >= 'A' && lyrics[i] <= 'G' && i - 1 >= 0 && lyrics[i - 1] == ' ')
        //        {
        //            for (int j = i; j < lyrics.Length && lyrics[j] != ' '&& lyrics[j] != '\r'; j++)
        //            {
        //                ch += lyrics[j];
        //            }
        //            finish = true;
        //        }
        //        if (finish)
        //        {
        //            finish = false;
        //            newChord = TransposeChord(ch, transpose);
        //            if (ch.Length < newChord.Length)
        //            {
        //                tranlyrics += newChord;
        //                i -= newChord.Length+1;
        //            }
        //            ch = "";
        //        }
        //        else
        //        {
        //            tranlyrics += lyrics[i];
        //            i -= newChord.Length;
        //        }
        //    }

        //    char[] charArray = tranlyrics.ToCharArray();
        //    Array.Reverse(charArray);
        //    tranlyrics = new string(charArray);
        //    ////מוכן להדפסה
        //    string newLyrics = "";
        //    for (int i = 0; i < tranlyrics.Length; i++)
        //    {
        //        if (tranlyrics[i] == ' ')
        //            newLyrics += "&nbsp;";
        //        else if (tranlyrics[i] == '\n')
        //            newLyrics += "<br/>";
        //        else
        //            newLyrics += tranlyrics[i];
        //    }
        //    return newLyrics;
        //}


        //public static string TranSong(string lyrics, string transpose)
        //{
        //    if (lyrics == null)
        //        return "";
        //    string tranlyrics = "", chord = "", newChord = "";
        //    ////שינוי הסולם
        //    for (int i = 0; i < lyrics.Length; i++)
        //    {
        //        if (lyrics[i] >= 'A' && lyrics[i] <= 'G')
        //        {
        //            chord = "";
        //            while (lyrics[i] != ' ' && lyrics[i] != '\n')
        //            {
        //                chord += lyrics[i++];
        //            }
        //            newChord = TransposeChord(chord, transpose);
        //            //if (newChord.Length > chord.Length && lyrics[i] != '\n')
        //            //    i++;
        //            //else if (newChord.Length < chord.Length)
        //            //    i--;
        //            tranlyrics += newChord;
        //        }
        //        tranlyrics += lyrics[i];

        //    }
        //    ////מוכן להדפסה
        //    string newLyrics = "";
        //    for (int i = 0; i < tranlyrics.Length; i++)
        //    {
        //        if (tranlyrics[i] == ' ')
        //            newLyrics += "&nbsp;";
        //        else if (tranlyrics[i] == '\n')
        //            newLyrics += "<br/>";
        //        else
        //            newLyrics += tranlyrics[i];
        //    }
        //    return newLyrics;
        //}


        //public static string TranSong(string lyrics, string transpose)
        //{
        //    string[] chords = GetChords(lyrics);
        //    string[] replacements = UpArr(chords, transpose);

        //    for (int i = 0; i < chords.Length; i++)
        //    {
        //        lyrics = lyrics.Replace(chords[i], replacements[i]);
        //    }
        //    ////מוכן להדפסה
        //    string newLyrics = "";
        //    for (int i = 0; i < lyrics.Length; i++)
        //    {
        //        if (lyrics[i] == ' ')
        //            newLyrics += "&nbsp;";
        //        else if (lyrics[i] == '\n')
        //            newLyrics += "<br/>";
        //        else
        //            newLyrics += lyrics[i];
        //    }
        //    return newLyrics;
        //}

        public static string TranSong(string lyrics, string transpose)
        {
            string[] lines = lyrics.Split("\r\n");
            for (int i = 0; i < lines.Length; i++)
            {
                lines[i] = TranLine(lines[i], transpose);
            }
            string tranSong = string.Join("\n", lines);

            ////מוכן להדפסה
            string newLyrics = "";
            for (int i = 0; i < tranSong.Length; i++)
            {
                if (tranSong[i] == ' ')
                    newLyrics += "&nbsp;";
                else if (tranSong[i] == '\n')
                    newLyrics += "<br/>";
                else
                    newLyrics += tranSong[i];
            }
            return newLyrics;

        }
        public static string TranLine(string line, string transpose)
        {
            if (GetChords(line).Length == 0)
                return line;
            int[] counts = new int[line.Length];
            string[] chords = new string[line.Length];
            string[] tranChords = new string[line.Length];
            string tranLine = "";
            int k = 0;
            for (int i = 0; i < line.Length; i++)
            {
                if (line[i] == ' ')
                {
                    while (i < line.Length && line[i] == ' ')
                    {
                        counts[k]++;
                        i++;
                    }
                    i--;
                    chords[k] = "";
                    chords[k++] = " ";
                }
                if (line[i] != ' ')
                {
                    while (i < line.Length && line[i] != ' ')
                    {
                        counts[k]++;
                        chords[k] += line[i];
                        i++;
                    }
                    i--;
                    k++;
                }
            }

            for (int i = 0; i < chords.Length; i++)
            {
                if (chords[i] == " ")
                    tranChords[i] = " ";
                if (chords[i] != " " && chords[i] != null)
                    tranChords[i] = TransposeChord(chords[i], transpose);
            }

            for (int i = 0; i < chords.Length; i++)
            {
                if (chords[i] != null && chords[i] != " ")
                {
                    if (chords[i].Length > tranChords[i].Length)
                    {
                        counts[i]--;
                        if (i - 1 >= 0)
                            counts[i - 1]++;
                    }
                    else if (chords[i].Length < tranChords[i].Length)
                    {
                        counts[i]++;
                        if (i - 1 >= 0)
                            counts[i + 1]--;
                    }
                    //if (chords[i].Length > tranChords[i].Length)
                    //{
                    //    counts[i]--;
                    //    if (i + 1 < chords.Length)
                    //        counts[i + 1]++;
                    //}
                    //else if (chords[i].Length < tranChords[i].Length)
                    //{
                    //    counts[i]++;
                    //    if (i + 1 < chords.Length)
                    //        counts[i + 1]--;
                    //}
                }

            }
            for (int i = 0; i < counts.Length; i++)
            {
                if (counts[i] != 0)
                    if (tranChords[i] == " ")
                    {
                        for (int j = 0; j < counts[i]; j++)
                        {
                            tranLine += " ";
                        }
                    }
                    else
                        tranLine += tranChords[i];
            }
            return tranLine;
        }

        ////שינוי אקורד
        static string TransposeChord(string chord, string transpose)
        {
            string[] chords = { "A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab" };

            int indexChord = -1, indexToReturn;
            string letter, ch = "", type = "", sign, number;
            letter = chord.Substring(0, 1);
            ch = chord.Length > 1 && (chord.Substring(1, 1) == "b" || chord.Substring(1, 1) == "#") ? chord.Substring(1, 1) : "";
            type = ch == "" ? chord.Substring(1) : chord.Substring(2);
            sign = transpose.Substring(0, 1);
            number = transpose.Substring(1);
            double num = Double.Parse(number);

            for (int i = 0; i < chords.Length; i++)
            {
                if (chords[i] == letter + ch)
                    indexChord = i;
            }
            for (int i = 0; i < chords.Length; i++)
            {
                if (chords[i] == letter + ch)
                    indexChord = i;
            }

            if (sign == "+")
                indexToReturn = (indexChord + (int)(num * 2)) % 12;
            else
                indexToReturn = ((indexChord - (int)(num * 2)) % 12 + 12) % 12;

            return chords[indexToReturn] + type;
        }

        ////מציאת סולם הקל
        public static string Easy(string lyrics)
        {
            string[] chords = GetChords(lyrics);
            string minTranspose = null, minI = null;
            string[] up = new string[chords.Length];
            Array.Copy(chords, up, chords.Length);

            int count, min = int.MaxValue, i, j = 0;
            for (i = 1; i <= 12; i++)
            {
                up = UpArr(up, "+0.5");
                count = 0;
                for (j = 0; j < up.Length; j++)
                {
                    if (up[j].Length > 1 && (up[j][1] == 'b' || up[j][1] == '#'))
                        count++;
                }
                if (count == 0)
                {
                    minTranspose = MostEasy(chords, minTranspose, "+" + (double)i / 2);
                }
                else if (count < min)
                {
                    min = count;
                    minI = "+" + (double)i / 2;
                }
            }
            if (minTranspose == null)
                return minI;
            return minTranspose;
        }
        ////מקבל שיר ומחזירה מערך של אקורדים
        static string[] GetChords(string song)
        {
            HashSet<string> chords = new HashSet<string>();

            for (int i = 0; i < song.Length; i++)
            {
                if (char.IsUpper(song[i]))
                {
                    int end = i + 1;
                    while (end < song.Length && !char.IsWhiteSpace(song[end]))
                    {
                        end++;
                    }
                    string chord = song.Substring(i, end - i);
                    chords.Add(chord);
                    i = end;
                }
            }
            return chords.ToArray();
        }
        ////שינוי סולם מערך
        static string[] UpArr(string[] chords, string up)
        {
            string[] upArr = new string[chords.Length];
            Array.Copy(chords, upArr, chords.Length);
            for (int i = 0; i < chords.Length; i++)
            {
                upArr[i] = TransposeChord(chords[i], up);
            }
            return upArr;
        }

        static string MostEasy(string[] chords, string transpose1, string transpose2)
        {
            if (transpose1 == null)
                return transpose2;
            int count1 = 0, count2 = 0;
            string[] hard = { "A", "Cm", "D", "E", "Fm", "Gm","Bm" }, up = UpArr(chords, transpose1);
            for (int i = 0; i < hard.Length; i++)
            {
                for (int j = 0; j < up.Length; j++)
                {
                    if (hard[i] == up[j])
                    {
                        count1++;
                        break;
                    }
                }
            }
            up = UpArr(chords, transpose2);
            for (int i = 0; i < hard.Length; i++)
            {
                for (int j = 0; j < up.Length; j++)
                {
                    if (hard[i] == up[j])
                    {
                        count2++;
                        break;
                    }
                }
            }
            if (count1 < count2)
                return "+" + Double.Parse(transpose1.Substring(1));
            return "+" + Double.Parse(transpose2.Substring(1));
        }
    }
}
