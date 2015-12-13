// https://www.nuget.org/profiles/microsoft?showAllPackages=True
// https://www.nuget.org/profiles/dotnetframework?showAllPackages=True

var compare = function(a, b) {
    // ordinal string comparison
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
};

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
}).filter(x => x).sort(compare);

var content = packages.reduce(function(data, package) {
    return data + package.name + " -> " + package.version + "\n";
}, "");

copy(content);