// https://www.nuget.org/profiles/microsoft?showAllPackages=True
// https://www.nuget.org/profiles/dotnetframework?showAllPackages=True

var packages = $("ul#searchResults .package h1").toArray().map(function(package) {
    var e = $(package);
    var name = e.find("a").text();

    var versionString = e.find("small").text();
    var match = /version: ?(.+)$/i.exec(versionString);

    if (!match || !match[1])
        throw "failed to match version against the string `" + versionString + "`";

    return {
        name: name,
        version: match[1].trim()
    };
}).filter(x => x);

packages.sort((x, y) => x.name < y.name);

packages.reduce(function(data, package) {
    return data + "\n" + package.name + " -> " + package.version;
}, "");