"use strict";(self.webpackChunkmisskey_hub=self.webpackChunkmisskey_hub||[]).push([[6547],{5769:(s,e,a)=>{a.r(e),a.d(e,{default:()=>os});var n=a(6252);const t=(0,n._)("h1",{id:"インサイド-misskey-hub",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#インサイド-misskey-hub","aria-hidden":"true"},"#"),(0,n.Uk)(" インサイド Misskey Hub")],-1),i={class:"custom-container tip"},l=(0,n._)("i",{class:"fas fa-info"},null,-1),r=(0,n.Uk)("この記事は、"),u={href:"https://adventar.org/calendars/6273",target:"_blank",rel:"noopener noreferrer"},p=(0,n.Uk)("Misskey Advent Calendar 2021"),o=(0,n.Uk)(" 1日目の記事です。"),k=(0,n._)("p",null,"こんにちはsyuiloです。いつもMisskeyを利用してくださってありがとうございます。開発の励みになります！",-1),c=(0,n._)("p",null,"2021年は、misskey.ioのデータベースが破壊されて貴重なノートが多数失われるなどの心を痛めるインシデントもありましたが、Misskeyの開発は順調に進んでいます。また、RSS3がMisskeyのスポンサーになってくださったことや、Patreonでの支援が増えてきたこともあり、おそらく財政的にはMisskey史上最も余裕が出てきていると思います。なので今後もMisskeyの開発は滞りなく進められそうです。:iihanashi:",-1),d=(0,n._)("p",null,"さて現在、Misskeyの開発と並行して、Misskeyの公式ドキュメントサイトであるMisskey Hub(つまりあなたが今いるここ！！！)の開発も進めています。今回は、そのMisskey Hubの実装詳細について紹介しようと思うのでお付き合いください。多少専門的になるかもしれませんが、なるべく分かりやすくなるように心がけます。",-1),h=(0,n._)("p",null,"Misskey Hubの実装について理解するためには、いくつかの前提知識が必要となるので、まずそれらの説明をします。ひとつめは静的サイトについて、ふたつめはSSGについてです。それでは始めましょう🚀",-1),_=(0,n._)("h2",{id:"静的サイト-is-何",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#静的サイト-is-何","aria-hidden":"true"},"#"),(0,n.Uk)(" 静的サイト is 何")],-1),g=(0,n._)("div",{class:"custom-container warning"},[(0,n._)("i",{class:"fas fa-exclamation"}),(0,n._)("p",null,[(0,n._)("strong",null,"性的サイト"),(0,n.Uk)("と誤変換しやすいので注意")])],-1),b=(0,n.Uk)("Misskey Hub内のMisskey Hub説明ページにもあるように、Misskey Hubは"),M={href:"https://v2.vuepress.vuejs.org/",target:"_blank",rel:"noopener noreferrer"},v=(0,n.Uk)("vuepress"),m=(0,n.Uk)("を使った"),y=(0,n._)("strong",null,"静的サイト",-1),f=(0,n.Uk)("(Static site)です。"),H=(0,n._)("br",null,null,-1),S=(0,n.Uk)(" 静的サイトとは、トートロジーっぽい表現になりますが"),U=(0,n._)("strong",null,"動的でないサイト",-1),w=(0,n.Uk)("のことです。動的なサイトというのは、例えばユーザー登録が行えてユーザーがコンテンツを投稿できたり、コメントを残せたり、とにかく「ユーザーから何らかのインタラクションを行えて、それがそのサイトを見る他のユーザーにも反映される」ようなサイトのことです。より雑に言うと常に内容が変化するサイトのことです。究極的に雑に言うと動的サイトがワイワイしたサイトで静的サイトがシーンとしたサイトです。"),G=(0,n.uE)('<p>もちろんMisskeyは動的サイトということになります。なぜかというと、例えばそこにはタイムラインがあって、訪れるたびにタイムラインの内容は変わりますし、タイムラインを見るユーザーによっても内容が変わります(フォローしているユーザーが異なるため)。</p><p>静的なサイトは逆に、そういったリッチなことは行わず、<strong>予め用意したコンテンツをどのユーザーに対しても同じように表示するだけのサイト</strong>です。Misskey Hubは(サイト更新を除けば)誰がいつ見ても同じ内容なので、静的サイトです。</p><div class="custom-container tip"><i class="fas fa-info"></i><p>技術的な話になりますが、静的と言っても、静的なのは「サーバーから」送られてくる内容だけであって、JavaScriptを使ってブラウザ上で動的にページの内容を変えることは可能です。 例えばMisskey Hubでは、サイドバーに表示されるMisskeyや藍ちゃんの広告はページを訪れるたびにランダムで変わるようになっています。<br> さらに言うと、静的サイト内に別の動的サイトを埋め込んで表示することも可能です。これを利用して、将来的にはそのページに対するMisskeyのコメントタイムラインをページに表示する、といったことも実装されるかもしれません。</p></div><h3 id="静的サイトだと何が嬉しいのか" tabindex="-1"><a class="header-anchor" href="#静的サイトだと何が嬉しいのか" aria-hidden="true">#</a> 静的サイトだと何が嬉しいのか</h3><p>ここで、静的サイトには動的サイトには無い、とても嬉しいメリットがあります。もったいぶるようですが、この記事の中でもおそらく一番重要なポイントです。刮目してください。それは...</p><p><strong>サーバーを用意する必要がない</strong><br> ということです。</p><p>もちろん静的といえどもウェブサイトなので、実際にはサーバーが存在しています。しかし、静的サイトは予め内容が決まっていて、どのユーザーが見ても内容は同じであることから、サイトを提供する際に動的サイトに比べて<strong>サーバーの負荷がほとんどかからない</strong>のに加えて、<strong>全てのページ内容をキャッシュすることが可能</strong>です。</p><p>サイトをキャッシュできると、<strong>CDN</strong>(Content Delivery Network)と呼ばれるインフラストラクチャ上にサイトのコンテンツを載せることができ、そもそも元のサーバーにリクエストが来る必要がなくなります。そう考えるとサーバーの負荷はゼロと言っても過言ではありません。</p><p>負荷がほとんどかからないことから、Misskeyや Misskey Hubがソースコードの管理に利用しているGitHubでは<strong>静的サイトを提供するための環境を無料で開発者に提供しています(GitHub Pages)。</strong> そのため、Misskey Hubを静的サイトとすることで、「サーバーを用意して、毎月料金を払って維持する」という必要がなくなります。しかも、GitHubの強力なインフラの上にサイトが構築されるので、DDoSといった障害の心配とも無縁です。</p><p>動的サイトを運営する際に発生するそのような諸々の心配から解放されるというのは非常に大きなメリットです。つまり、金銭面においても精神面においても、<strong>ゼロコスト</strong>でMisskey Hubを運用できます。</p><details class="custom-container details"><summary>さらに技術的な話(危険)</summary><p>ここまで言っておいてなんですが、先ほど言った</p><blockquote><p>もちろんMisskeyは動的サイトということになります。</p></blockquote><p>というのは <strong>嘘</strong> です。説明を簡単にするために、また理解してもらいやすくするために嘘をつきました。ここまで読んで混乱してしまった人は、このセクションをスキップしてなかったことにしてください。</p><p>実は、厳密に言うとMisskey(のWebクライアント)は<strong>静的サイト</strong>なんです。</p><p>どういうことかというと、Misskey Webは、全てJavaScriptで動いています。そしてそのJavaScriptは不変です。 MisskeyのWebサーバーは、その不変なJavaScriptを送り返すだけで、動的なHTMLをレンダリングしたりはしないので、Misskey Webは静的です。 なので、あなたがMisskey Webを開いた<strong>瞬間</strong>は、(CDNが設定されている場合)Misskeyサーバーにリクエストはひとつも来ません。 もちろんJavaScriptが動きだしたら、アカウント情報を取得したり、タイムラインを取得したりするのでリクエストは発生します。 静的なJavaScript上で動的なコンテンツが実現されているということです。</p><p>ちなみに、こういう構成のことをIT界では<strong>サーバーレス</strong>と呼んだりするっぽいです。知らんけど。</p></details><h2 id="ssg-is-何" tabindex="-1"><a class="header-anchor" href="#ssg-is-何" aria-hidden="true">#</a> SSG is 何</h2><p>ここまでは静的サイトとは何か、について話しました。ここからは、そんな静的サイトを開発するのに便利な<strong>SSG</strong>について紹介します。</p><p>おそらくほとんどの人は見慣れない言葉だと思いますが、SSGとは、<strong>静的サイトジェネレーター</strong>(Static Site Generator)の略で、その名の通り静的サイトを生成するソフトウェアです。</p><p>静的サイトを作るだけならば、HTMLやCSSを手で書いてアップロードするだけでも良いのですが、コンテンツの量が多くなってくると管理が大変になるのと、そもそもHTMLという非ヒューマンフレンドリーなマークアップでドキュメントを書きたくないというのがあります。</p><p>そこでSSGが登場します。SSGを利用することで、Markdownと呼ばれるより人間に書きやすいマークアップでドキュメントを記述できるようになるほか、特に何も書かなくても自動で良い感じ™のデザインでページを表示してくれたりします。さらに、人力では実装が難しいサイト内検索なども提供してくれます。</p><p>もちろん実際のサーバー(というよりブラウザ)はHTMLしか解釈できませんので、SSGはサーバーにファイルをアップロードする前に<strong>コンパイル</strong>という処理を行なって、MarkdownをHTMLに変換します。</p><p>SSGは特定のソフトウェアを指すものではなく、概念を表す言葉です。したがって、複数のSSG実装が存在します。Misskey Hubでは、前述のように vuepress というSSGを採用しています。</p><h2 id="vuepress-is-何" tabindex="-1"><a class="header-anchor" href="#vuepress-is-何" aria-hidden="true">#</a> vuepress is 何</h2><p>ここまではSSGについて話しました。ここからやっと、Misskey Hubの実装の話に入ることができます。</p><p><strong>vuepress</strong>は、UIフレームワークにVueを採用したSSGです。Misskey Hubはvuepressのv2(2021年11月現在ベータ版)を使用しています。 Vueについては、vuepressがあまりそれを意識しないでも使える設計になっているためこの記事では割愛します。</p><p>Misskey HubがSSGにvuepressを採用した理由は、技術スタックがモダンでMisskeyのそれと一致していることや、使いやすさや拡張性で優れていると思ったためです。 さらに、他のSSGは何かしら欠点があったのに対し、vuepressにはそういった欠点は(SSGの中でもかなり新しい方であるため、まだ後述するプラグインやテーマが少ないというのを除けば)ありませんでした。 ただ、他のSSGを使い込んで吟味はしていないので、拡張性などに関しては比較ではありません。</p><h3 id="テーマ" tabindex="-1"><a class="header-anchor" href="#テーマ" aria-hidden="true">#</a> テーマ</h3><p>Misskey Hubのデザインは、vuepress標準で用意されているテーマを少しMisskey風にアレンジしたものになっています。ゼロから実装するのは大変ですしメンテナンスするコストも発生してきますが、アレンジなので運用が楽です。もちろんダークモードにも対応しています。 Misskeyと同じく、vuepressも<strong>CSS Variables</strong>を使って簡単に配色を変更できるようになっています。</p><h3 id="プラグイン" tabindex="-1"><a class="header-anchor" href="#プラグイン" aria-hidden="true">#</a> プラグイン</h3><p>vuepressはプラグイン機能があり、開発者が自由にvuepressを拡張できるようになっています。 プラグインを駆使することで、また時には自分でプラグインを作成することで、静的サイトながら動的サイトに見紛うようなリッチな機能を提供することができたりします。</p><p>Misskey Hubもプラグイン機能を使っていて、「関連するページ」「最近更新されたページ」といった独自の機能を持たせています。</p><p>「関連するページ」については、各ページで自身と関連するページを手動で指定できるようになっているほか、ページ中で使われたリンクを収集&amp;自身にリンクしている他ページを収集して「関連するページ」にリストアップするようにしています。</p><p>また、「最近更新されたページ」についても、Misskey Hubオリジナルの実装で実現していて、コンパイル時に全てのページファイルを収集してそれぞれの更新日時を後述するGitで取得し、新しい順に並べ替え、ページとしてレンダリングするようにしています。</p><p>さらに、MFMを実際に書いて試せるプレイグラウンド機能や、APIリファレンスにおけるAPIコンソールなども今後実装予定です。</p><div class="custom-container tip"><i class="fas fa-info"></i><p>「関連するページ」「最近更新されたページ」は我ながら便利機能だと思っているので、Misskey Hub以外のvuepressを採用したサイトでも使えるようにnpmで一般公開しようかとも考えています。</p></div><h3 id="多言語対応-i18n" tabindex="-1"><a class="header-anchor" href="#多言語対応-i18n" aria-hidden="true">#</a> 多言語対応(i18n)</h3><p>多言語対応することは<strong>i18n</strong>(Internationalizationの略)と呼ばれます。vuepressには標準でi18n対応が組み込まれているので、Misskey Hubも簡単にi18nすることができました。</p><h3 id="サイト内検索" tabindex="-1"><a class="header-anchor" href="#サイト内検索" aria-hidden="true">#</a> サイト内検索</h3><p>vuepress標準の機能で、右上にあるやつです。各ページの見出しを対象にして検索されるようです。これをSSGの助けなしに実装するのは厳しいと思います。</p><h3 id="目次生成" tabindex="-1"><a class="header-anchor" href="#目次生成" aria-hidden="true">#</a> 目次生成</h3><p>自動で目次を生成してくれます。(ページ左)</p><p>こんな感じでページ内に埋め込むこともできます:</p>',38),W={class:"table-of-contents"},x=(0,n.Uk)("静的サイト is 何"),P=(0,n.Uk)("静的サイトだと何が嬉しいのか"),C=(0,n.Uk)("SSG is 何"),L=(0,n.Uk)("vuepress is 何"),T=(0,n.Uk)("テーマ"),J=(0,n.Uk)("プラグイン"),R=(0,n.Uk)("多言語対応(i18n)"),D=(0,n.Uk)("サイト内検索"),I=(0,n.Uk)("目次生成"),j=(0,n.Uk)("HMR"),A=(0,n.Uk)("藍モード"),q=(0,n.Uk)("ページ"),F=(0,n.Uk)("インスタンス一覧"),N=(0,n.Uk)("管理"),E=(0,n.Uk)("デプロイについて"),V=(0,n.Uk)("さいごに"),O=(0,n.Uk)("P.S."),Z=(0,n._)("h3",{id:"hmr",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#hmr","aria-hidden":"true"},"#"),(0,n.Uk)(" HMR")],-1),z=(0,n._)("p",null,[(0,n._)("strong",null,"HMR"),(0,n.Uk)("(Hot Module Replacementの略)は、開発中に使われる機能で、ブラウザをリロードすることなしにページ内容の変更を反映してくれます。エディタで編集し、保存するだけでリアルタイムでページに反映されるので、開発がとても快適になります。")],-1),Y=(0,n._)("h2",{id:"藍モード",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#藍モード","aria-hidden":"true"},"#"),(0,n.Uk)(" 藍モード")],-1),B=(0,n._)("p",null,[(0,n.Uk)("もちろん藍モードも搭載しています。藍モードを有効にすることで藍ちゃんをサイト上に召喚することが可能です。"),(0,n._)("s",null,"スマホだとそれなりに邪魔ですがそれも含めて"),(0,n.Uk)("お楽しみください。藍は地球を救う")],-1),K=(0,n._)("p",null,[(0,n._)("button",{onclick:"localStorage.setItem('aimode', 'true'); location.reload();"},"今すぐ藍モードをオンにする")],-1),Q=(0,n.Uk)("→→→"),X={href:"https://misskey.io/@shinamu476",target:"_blank",rel:"noopener noreferrer"},$=(0,n.Uk)("Live2D藍ちゃん創造神"),ss=(0,n.Uk)("←←←"),es=(0,n.uE)('<h2 id="ページ" tabindex="-1"><a class="header-anchor" href="#ページ" aria-hidden="true">#</a> ページ</h2><p>各ページはMarkdown(MFMみたいなもの(いや本来はMFMが「Markdownのようなもの」という立ち位置だけれども))というマークアップ言語で書かれています。Markdownを使うことで、簡単に見出し、リンク、画像、表といった要素を表現できるほか、</p><div class="custom-container tip"><i class="fas fa-info"></i><p>こんな</p></div><div class="custom-container warning"><i class="fas fa-exclamation"></i><p>感じの</p></div><div class="custom-container danger"><i class="fas fa-times"></i><p>メッセージ</p></div><p>を表示したりできます。(厳密にはMarkdownの拡張構文)</p><p>また、vuepressの機能により、各見出し(ヘッダ)にハッシュリンクが付くようになっています。</p>',7),as=(0,n.Uk)("このページのMarkdownソースを見たい方は"),ns={href:"https://raw.githubusercontent.com/misskey-dev/misskey-hub/main/src/blog/2021-12-01-inside-misskey-hub.md",target:"_blank",rel:"noopener noreferrer"},ts=(0,n.Uk)("こちら"),is=(0,n._)("p",null,"参考までに、同じ文章をMarkdownとHTMLとで書いた場合の比較を載せます。",-1),ls=(0,n._)("div",{class:"language-markdown ext-md"},[(0,n._)("pre",{class:"language-markdown"},[(0,n._)("code",null,[(0,n._)("span",{class:"token title important"},[(0,n._)("span",{class:"token punctuation"},"##"),(0,n.Uk)(" 静的サイト is 何")]),(0,n.Uk)("\nMisskey Hub内のMisskey Hub説明ページにもあるように、Misskey Hubは"),(0,n._)("span",{class:"token url"},[(0,n.Uk)("["),(0,n._)("span",{class:"token content"},"vuepress"),(0,n.Uk)("]("),(0,n._)("span",{class:"token url"},"https://v2.vuepress.vuejs.org/"),(0,n.Uk)(")")]),(0,n.Uk)("を使った"),(0,n._)("span",{class:"token bold"},[(0,n._)("span",{class:"token punctuation"},"**"),(0,n._)("span",{class:"token content"},"静的サイト"),(0,n._)("span",{class:"token punctuation"},"**")]),(0,n.Uk)("(Static site)です。\n")])])],-1),rs=(0,n._)("div",{class:"language-html ext-html"},[(0,n._)("pre",{class:"language-html"},[(0,n._)("code",null,[(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token punctuation"},"<"),(0,n.Uk)("h2")]),(0,n._)("span",{class:"token punctuation"},">")]),(0,n.Uk)("静的サイト is 何"),(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token punctuation"},"</"),(0,n.Uk)("h2")]),(0,n._)("span",{class:"token punctuation"},">")]),(0,n.Uk)("\n"),(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token punctuation"},"<"),(0,n.Uk)("p")]),(0,n._)("span",{class:"token punctuation"},">")]),(0,n.Uk)("Misskey Hub内のMisskey Hub説明ページにもあるように、Misskey Hubは"),(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token punctuation"},"<"),(0,n.Uk)("a")]),(0,n.Uk)(),(0,n._)("span",{class:"token attr-name"},"href"),(0,n._)("span",{class:"token attr-value"},[(0,n._)("span",{class:"token punctuation attr-equals"},"="),(0,n._)("span",{class:"token punctuation"},'"'),(0,n.Uk)("https://v2.vuepress.vuejs.org/"),(0,n._)("span",{class:"token punctuation"},'"')]),(0,n.Uk)(),(0,n._)("span",{class:"token attr-name"},"target"),(0,n._)("span",{class:"token attr-value"},[(0,n._)("span",{class:"token punctuation attr-equals"},"="),(0,n._)("span",{class:"token punctuation"},'"'),(0,n.Uk)("_blank"),(0,n._)("span",{class:"token punctuation"},'"')]),(0,n._)("span",{class:"token punctuation"},">")]),(0,n.Uk)("vuepress"),(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token punctuation"},"</"),(0,n.Uk)("a")]),(0,n._)("span",{class:"token punctuation"},">")]),(0,n.Uk)("を使った"),(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token punctuation"},"<"),(0,n.Uk)("strong")]),(0,n._)("span",{class:"token punctuation"},">")]),(0,n.Uk)("静的サイト"),(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token punctuation"},"</"),(0,n.Uk)("strong")]),(0,n._)("span",{class:"token punctuation"},">")]),(0,n.Uk)("(Static site)です。"),(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token tag"},[(0,n._)("span",{class:"token punctuation"},"</"),(0,n.Uk)("p")]),(0,n._)("span",{class:"token punctuation"},">")]),(0,n.Uk)("\n")])])],-1),us=(0,n.uE)('<h2 id="インスタンス一覧" tabindex="-1"><a class="header-anchor" href="#インスタンス一覧" aria-hidden="true">#</a> インスタンス一覧</h2><p>「プラグイン」のセクションでも触れましたが、vuepressでは、Markdownで書かれたページ以外にも、プログラムで(コンパイル時に)生成するページを用意することができます。</p><p>「インスタンス一覧」ページもその一つで、予めインスタンス一覧の情報をJSONという形式で用意しておき、それを基にしてインスタンス一覧ページをレンダリングするようになっています。</p><p>各インスタンス紹介は、インスタンス側で用意されたプロフィールレンダリングページをiframeというHTMLの機能で埋め込んで表示するようになっています。したがって、一度Misskey Hubにインスタンスを登録してしまえば、インスタンスの名前、説明、バナー画像といった情報を更新した場合でもリアルタイムでインスタンス一覧に反映されます。</p><div class="custom-container tip"><i class="fas fa-info"></i><p>インスタンス一覧へ掲載するインスタンスを募集しています。お気軽にご連絡ください🤗</p></div><h2 id="管理" tabindex="-1"><a class="header-anchor" href="#管理" aria-hidden="true">#</a> 管理</h2><p>Misskey HubはMisskeyと同じく、<strong>GitHub</strong>(Git)上で管理しています。</p><p>Gitで管理することで、全ての変更についての履歴が<strong>リポジトリ</strong>に保存され、簡単に過去の版を参照したり、変更を差し戻したりすることができます。</p><p>リポジトリに内容の変更(新規ページの作成も含む)を適用することは<strong>コミット</strong>と呼ばれます。</p><h2 id="デプロイについて" tabindex="-1"><a class="header-anchor" href="#デプロイについて" aria-hidden="true">#</a> デプロイについて</h2><p>サイトの内容を実際のサーバーにアップロードし反映させることを<strong>デプロイ</strong>と呼びます。</p><p>Misskey Hubにおいては、GitHub ActionsというGitHubの機能を利用して、サイトの内容に変更を加えると(リポジトリにコミットを行うと)自動でコンパイル &amp; GitHub Pagesデプロイが行われる仕組みになっています。</p><p>GitHub Pagesは前述した「静的サイトを提供してくれる機能」です。GitHubのインフラストラクチャ上で動くため、いちどデプロイしてしまえば、あとは何の心配もなくMisskey Hubが提供され続けます。</p><div class="custom-container warning"><i class="fas fa-exclamation"></i><p>「何の心配もなく」はちょっと言い過ぎたかもしれません。というのも、(強いていうと)ひとつだけ心配があって、それはドメインです。Misskey Hubはmisskey-hub.netというドメインで提供されていますが、これは私が用意したものです。そのため、もし万が一私がドメインの更新を忘れるとMisskey Hubに繋がらなくなりますが、そこは𝑇𝑟𝑢𝑠𝑡 𝑚𝑒</p></div><p>通常のWebサイトであれば、サーバーにFTPでファイルをアップロードしたり、サーバーにSSHで繋いでファイルをダウンロードしてきたりといった作業が必要になりますが、GitHub Pagesではそのような手間すら要りません。</p><p>デプロイを終えると、Misskey Hubがインターネット上に公開されてWebブラウザで見ることができるようになります。めでたし！</p><h2 id="さいごに" tabindex="-1"><a class="header-anchor" href="#さいごに" aria-hidden="true">#</a> さいごに</h2><p>Misskey Hubは、Misskeyと同じくオープンソースであり、貢献はいつでも歓迎しています。まだまだ不足しているドキュメントも多いので、ぜひドキュメント拡充にご協力お願いします。インスタンスを運営してきた上で得られたナレッジなどをアウトプットする場としてもMisskey Hubを利用していただけると幸いです。また、Misskey Hubもi18nしており、ドキュメントの翻訳も歓迎です。</p><p>この記事で、Misskey Hubの実装、ひいては静的サイトとは何か、SSGとは何かを何となくでも理解していただけたなら、また利用するだけではなかなか知ることがない開発の裏側について思いを馳せていただけたなら、幸いです。</p><p>SSGはMisskey Hubのようなドキュメントサイトだけでなく、ブログなどにも使えるので、皆さんもぜひ活用してみてください。 実際、この記事のようにMisskey Hubを開発ブログとしても使用しています。 多少知識は要りますが、ゼロコストでブログ運営できるのでチャレンジする価値はあるはずです。(無料でブログ運営できるサービスはあるけど、広告が付いてくる)</p><p>さて、ここまで一気呵成に書き上げて:hinata_acid:になってきたので、今回はここら辺で終わりにします。お付き合いいただきありがとうございました。</p><p>静的サイトはいいぞ。vuepressはいいぞ。Misskey Hubに幸あれ🙏</p><h2 id="p-s" tabindex="-1"><a class="header-anchor" href="#p-s" aria-hidden="true">#</a> P.S.</h2><p><strong>ニラ</strong>はいいぞ。</p><p>栄養があるし、加熱不要で調理も楽(ハサミで切って味噌に突っ込んでチンするだけで味噌汁できる)</p><div class="custom-container danger"><i class="fas fa-times"></i><p>ただし加熱しないと風味が強すぎ、ちょっとしたワサビ食べてるみたいになるので多少訓練が必要</p></div>',26),ps={},os=(0,a(3744).Z)(ps,[["render",function(s,e){const a=(0,n.up)("OutboundLink"),ps=(0,n.up)("RouterLink"),os=(0,n.up)("CodeGroupItem"),ks=(0,n.up)("CodeGroup");return(0,n.wg)(),(0,n.iD)(n.HY,null,[t,(0,n._)("div",i,[l,(0,n._)("p",null,[r,(0,n._)("a",u,[p,(0,n.Wm)(a)]),o])]),k,c,d,h,_,g,(0,n._)("p",null,[b,(0,n._)("a",M,[v,(0,n.Wm)(a)]),m,y,f,H,S,U,w]),G,(0,n._)("nav",W,[(0,n._)("ul",null,[(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#静的サイト-is-何"},{default:(0,n.w5)((()=>[x])),_:1}),(0,n._)("ul",null,[(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#静的サイトだと何が嬉しいのか"},{default:(0,n.w5)((()=>[P])),_:1})])])]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#ssg-is-何"},{default:(0,n.w5)((()=>[C])),_:1})]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#vuepress-is-何"},{default:(0,n.w5)((()=>[L])),_:1}),(0,n._)("ul",null,[(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#テーマ"},{default:(0,n.w5)((()=>[T])),_:1})]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#プラグイン"},{default:(0,n.w5)((()=>[J])),_:1})]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#多言語対応-i18n"},{default:(0,n.w5)((()=>[R])),_:1})]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#サイト内検索"},{default:(0,n.w5)((()=>[D])),_:1})]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#目次生成"},{default:(0,n.w5)((()=>[I])),_:1})]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#hmr"},{default:(0,n.w5)((()=>[j])),_:1})])])]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#藍モード"},{default:(0,n.w5)((()=>[A])),_:1})]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#ページ"},{default:(0,n.w5)((()=>[q])),_:1})]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#インスタンス一覧"},{default:(0,n.w5)((()=>[F])),_:1})]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#管理"},{default:(0,n.w5)((()=>[N])),_:1})]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#デプロイについて"},{default:(0,n.w5)((()=>[E])),_:1})]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#さいごに"},{default:(0,n.w5)((()=>[V])),_:1})]),(0,n._)("li",null,[(0,n.Wm)(ps,{to:"#p-s"},{default:(0,n.w5)((()=>[O])),_:1})])])]),Z,z,Y,B,K,(0,n._)("p",null,[Q,(0,n._)("a",X,[$,(0,n.Wm)(a)]),ss]),es,(0,n._)("p",null,[as,(0,n._)("a",ns,[ts,(0,n.Wm)(a)])]),is,(0,n.Wm)(ks,null,{default:(0,n.w5)((()=>[(0,n.Wm)(os,{title:"Markdown",active:""},{default:(0,n.w5)((()=>[ls])),_:1}),(0,n.Wm)(os,{title:"HTML"},{default:(0,n.w5)((()=>[rs])),_:1})])),_:1}),us],64)}]])},3744:(s,e)=>{e.Z=(s,e)=>{for(const[a,n]of e)s[a]=n;return s}},3896:(s,e,a)=>{a.r(e),a.d(e,{data:()=>n});const n={key:"v-1b94d463",path:"/blog/2021-12-01-inside-misskey-hub.html",title:"インサイド Misskey Hub",lang:"ja-JP",frontmatter:{description:"Misskey Advent Calendar 2021 1日目の記事です。Misskey Hubの実装について紹介します。"},excerpt:"",headers:[{level:2,title:"静的サイト is 何",slug:"静的サイト-is-何",children:[{level:3,title:"静的サイトだと何が嬉しいのか",slug:"静的サイトだと何が嬉しいのか",children:[]}]},{level:2,title:"SSG is 何",slug:"ssg-is-何",children:[]},{level:2,title:"vuepress is 何",slug:"vuepress-is-何",children:[{level:3,title:"テーマ",slug:"テーマ",children:[]},{level:3,title:"プラグイン",slug:"プラグイン",children:[]},{level:3,title:"多言語対応(i18n)",slug:"多言語対応-i18n",children:[]},{level:3,title:"サイト内検索",slug:"サイト内検索",children:[]},{level:3,title:"目次生成",slug:"目次生成",children:[]},{level:3,title:"HMR",slug:"hmr",children:[]}]},{level:2,title:"藍モード",slug:"藍モード",children:[]},{level:2,title:"ページ",slug:"ページ",children:[]},{level:2,title:"インスタンス一覧",slug:"インスタンス一覧",children:[]},{level:2,title:"管理",slug:"管理",children:[]},{level:2,title:"デプロイについて",slug:"デプロイについて",children:[]},{level:2,title:"さいごに",slug:"さいごに",children:[]},{level:2,title:"P.S.",slug:"p-s",children:[]}],filePathRelative:"blog/2021-12-01-inside-misskey-hub.md",git:{updatedTime:163827888e4,contributors:[{name:"syuilo",email:"Syuilotan@yahoo.co.jp",commits:7}]}}}}]);