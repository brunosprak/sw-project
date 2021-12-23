export const BOOKS_WIKI_TEXT = `
{| 
|+
|- 
|- 
! Title
! Author
! Format
! Publish date
|-
|''[[Star Wars: Be More Boba Fett]]''
|
|Self-help book
|December 21, 2021
|-
|''[[BB-8 and the Snow Monster]]''
|[[Caitlin Kennedy]]
|Young readers book
|[[February 7]], [[2023]]
|-
|[[Darth Plagueis (novel)|''Darth Plagueis'']]
|[[James Luceno]]
|''The Essential Legends Collection'' reprint
|April 5, 2022
|}
`;

export const BB8_WIKI_TEXT = `
{{Top|real|can|title=''{{PAGENAME}}''}}
{{Future product|book}}
{{Book
|image=
|book name=''BB-8 and the Snow Monster''
|author=[[Caitlin Kennedy]]<ref name="Edelweiss">{{Edelweiss|url=#sku=136805188X|text=Star Wars BB-8 and the Snow Monster|archiveurl=https://archive.ph/N9LXA}}</ref>
|cover artist=
|illustrator=[[Brian Kesinger]]<ref name="Edelweiss" />
|editor=
|publisher=[[Disney–Lucasfilm Press]]<ref name="Edelweiss" />
|release date=[[February 7]], [[2023]]<ref name="Edelweiss" />
|media type=Hardcover<ref name="Edelweiss" />
|pages=64<ref name="Edelweiss" />
|isbn=9781368051880
|timeline=[[34 ABY]]&ndash;[[35 ABY]]<ref name="Timeline">''BB-8 and the Snow Monster'' takes place some time between [[Star Wars: Episode VII The Force Awakens|''Star Wars'': Episode VII ''The Force Awakens'']] and [[Star Wars: Episode IX The Rise of Skywalker|''Star Wars'': Episode IX ''The Rise of Skywalker'']]. ''[[Star Wars: Galactic Atlas]]'' places ''The Force Awakens'' in [[34 ABY]] and ''[[Star Wars: The Rise of Skywalker: The Visual Dictionary]]'' places ''The Rise of Skywalker'' one year later, or [[35 ABY]]. Because ''BB-8 and the Snow Monster'' takes place between these two films it must take place in between 34 ABY and 35 ABY.</ref>
|series=''[[Droid Tales]]''<ref name="Edelweiss" />
|preceded by=''[[R2-D2 is LOST!]]''
|followed by=}}
`;

export const BOBA_FETT_WIKI_TEXT = `
{{Top|real|can|title=''{{PAGENAME}}''}}
{{Future product|book}}
{{Book
|image=[[File:Be_More_Boba_Fett_cover.jpg]]
|book name=''Star Wars: Be More Boba Fett''
|author=[[Joseph Jay Franco]]<ref name="Edelweiss">{{Edelweiss|url=#sku=0744053161|text=Star Wars Be More Boba Fett|archiveurl=https://archive.vn/eVqhW}}</ref>
|cover artist=
|illustrator=
|editor=
|publisher=[[Dorling Kindersley|DK Publishing]]
|release date=[[December 21]], [[2021]]<ref name="Boba">{{Penguin|books/696644/star-wars-be-more-boba-fett-by-dk/9780744053166|Star Wars Be More Boba Fett|archiveurl=https://archive.vn/N94Pp}}</ref>
|media type=Hardcover<ref name="Boba" />
|pages=
|isbn=9780744053166
|timeline=
|series=''[[Star Wars: Be More...]]''<ref name="Boba" />
|preceded by=''[[Star Wars: Be More Leia]]''
|followed by=''[[Star Wars: Be More Obi-Wan]]''}}
`;
export const DARK_PLAGUES_TEXT = `{{Top|new|real|title=''{{PAGENAME}}''}}
    {{Book
    |book name=''Darth Plagueis''
    |image=[[File:darthplagueis-cover.jpg]]
    |author=[[James Luceno]]
    |cover artist=*[[Torstein Nordstrand]] {{C|Illustration}}
    *[[Elizabeth A. D. Eno]] {{C|Book design}}
    |illustrator=
    |editor=
    |publisher=
    *[[Del Rey]] (US)
    *[[Arrow Books Ltd.|Arrow]] (UK)
    |release date=[[January 10]], [[2012]]<ref name="SWBooks">{{FacebookCite|profilelink=starwarsbooks|url=starwarsbooks/posts/10150350678103713|author=Star Wars Books|description=Date change for ''Darth Plagueis''|dateposted=2011-09-30|archivedate=20160115204708}}</ref>
    |media type=Hardcover
    |pages=379
    |isbn=034551128X
    |timeline=[[67 BBY|67]]-[[65 BBY/Legends|65 BBY]] {{C|Part 1}}<ref name="TERC">''[[The Essential Reader's Companion]]''</ref><br />[[54 BBY/Legends|54]]-[[52 BBY/Legends|52 BBY]] {{C|Part 2}}<ref name="TERC" /><br />[[34 BBY/Legends|34]]-[[32 BBY/Legends|32 BBY]] {{C|Part 3}}<ref name="TERC" />
    |series=
    |preceded by=''[[The Tenebrous Way]]''
    |followed by=''[[Legacy of the Jedi]]''}}`;

export const fetchMock = async (url) => {
  const [titlePage, action] = url.split('/')[4].split('?');
  const format = action && action.indexOf('raw') !== -1 ? 'wiki' : 'html';

  const response = (text) => ({
    text: () => text,
  });

  if (titlePage === 'List_of_future_books' && format === 'wiki') {
    return response(BOOKS_WIKI_TEXT);
  }

  if (titlePage === 'BB-8_and_the_Snow_Monster') {
    if (format === 'wiki') {
      return response(BB8_WIKI_TEXT);
    }
    return response('<html>No images in this html</html>');
  }

  if (titlePage === 'Darth_Plagueis_(novel)') {
    if (format === 'wiki') {
      return response(DARK_PLAGUES_TEXT);
    }
    return response('<html>No images in this html</html>');
  }

  if (titlePage === 'Star_Wars:_Be_More_Boba_Fett') {
    if (format === 'wiki') {
      return response(BOBA_FETT_WIKI_TEXT);
    }

    return response(`<a href="https://static.wikia.nocookie.net/starwars/images/c/c0/Be_More_Boba_Fett_cover.jpg/revision/latest?cb=20210723182158" class="image image-thumbnail"
              title="">
               <img src="https://static.wikia.nocookie.net/starwars/images/c/c0/Be_More_Boba_Fett_cover.jpg/revision/latest/scale-to-width-down/500?cb=20210723182158" srcset="https://static.wikia.nocookie.net/starwars/images/c/c0/Be_More_Boba_Fett_cover.jpg/revision/latest/scale-to-width-down/500?cb=20210723182158 1x, https://static.wikia.nocookie.net/starwars/images/c/c0/Be_More_Boba_Fett_cover.jpg/revision/latest/scale-to-width-down/1000?cb=20210723182158 2x" class="pi-image-thumbnail" alt="" width="270" height="368"
                    data-image-key="Be_More_Boba_Fett_cover.jpg" data-image-name="Be More Boba Fett cover.jpg"/>
           </a>`);
  }

  throw Error(`Page not found: ${titlePage}`);
};
