WordPress

# Taking Playground Further: Meet Blueprints!

El Puas 03/10/2025

## What is WordPress Playground?

WordPress Playground lets you run a fully functional WordPress site directly in your browser — no setup needed. It’s a great tool for quick testing, development, and learning WordPress without hassle. If you’re new to Playground, you might want to check my previous blog post for an easy-to-follow overview: [_Read my introduction to WordPress Playground here!_](https://webdevstudios.com/2025/03/06/skip-the-setup-wordpress-playground-in-your-browser/) (opens in a new tab).

### What Exactly Are Blueprints?

Blueprints are powerful JSON files that tell Playground exactly how to set up your WordPress environment. With Blueprints, you can quickly create and share customized WordPress setups, perfect for:

*   Instant plugin and theme demos
    
*   Automated tests and client presentations
    
*   Consistent, repeatable WordPress setups
    

### Let’s check how Blueprints work and how you can use them!

A blueprint is a JSON file that specifies which plugins, themes, and settings to load automatically. It is a recipe for creating your WordPress Playground environment.

Why use Blueprints? Instead of manually installing plugins or configuring settings every time, you load your Blueprint, and your ideal environment appears instantly.

### Simple Example of a Blueprint

Here’s how a basic Blueprint looks:

```
{
  "preferredVersions": {
    "wp": "6.5",
    "php": "7.4"
  },
  "steps": [
    {
      "step": "installPlugin",
      "pluginData": {
        "resource": "wordpress.org/plugins",
        "slug": "coblocks"
      }
    }
  ]
}
```

This simple Blueprint specifies that we want WordPress version 6.5 and PHP 7.4, and it automatically installs the CoBlocks plugin (from the [WordPress.org](http://WordPress.org) plugin directory) when the Playground starts.

**How do you use a Blueprint?** Just add it to the Playground URL as a fragment. For example:

```
<https://playground.wordpress.net/#{"preferredVersions":{"wp":"6.5","php":"7.4"}>}
```

Paste your JSON after the # as shown above (make sure it’s all one line). You can also upload the Blueprint JSON file directly in the Playground interface via the **“Load Blueprint”** option.

**Next Step: Let’s Add a Theme!**

Now that we’ve covered the basics, let’s take it a step further. In the next example, we’ll modify the Blueprint to install a theme and configure the site automatically.

```
{
  "steps": [
    {
      "step": "installTheme",
      "themeData": {
        "resource": "wordpress.org/themes",
        "slug": "twentytwentyfour"
      }
    },
    {
      "step": "activateTheme",
      "themeFolderName": "twentytwentyfour"
    }
  ]
}
```

**What this does:**

*   Installs the Twenty Twenty-Four theme directly from [WordPress.org](http://WordPress.org).
    
*   Activates the theme automatically when the Playground starts.
    

By adding two steps – one to install the theme and another to activate it – our Playground will come up with Twenty Twenty-Four already set as the active theme.

## **Advanced Blueprint: Plugins, Custom Content, and Settings**

You already know the basics, so let’s get more interesting. One powerful Playground feature is the ability to automatically insert custom content (posts, pages, settings, etc.) every time you spin up a new instance.

Here’s an advanced but practical example. This **full Blueprint** will do the following:

*   Set a custom site title and description.
    
*   Install the Twenty Twenty-Four theme and the CoBlocks plugin (and activate the theme).
    
*   Automatically insert a sample blog post and a page.
    

```
{
  "landingPage": "/wp-admin/edit.php",
  "login": true,
  "steps": [
    {
      "step": "setSiteOptions",
      "options": {
        "blogname": "My Awesome Playground",
        "blogdescription": "Testing WordPress Playground Blueprints!"
      }
    },
    {
      "step": "installPlugin",
      "pluginData": {
        "resource": "wordpress.org/plugins",
        "slug": "coblocks"
      }
    },
    {
      "step": "installTheme",
      "themeData": {
        "resource": "wordpress.org/themes",
        "slug": "twentytwentyfour"
      }
    },
    {
      "step": "activateTheme",
      "themeFolderName": "twentytwentyfour"
    },
    {
      "step": "runPHP",
      "code": "<?php require_once 'wordpress/wp-load.php'; wp_insert_post(array('post_title' => 'Hello from Playground!', 'post_content' => '<!-- wp:paragraph --><p>This is my first blog post using Playground!</p><!-- /wp:paragraph -->', 'post_status' => 'publish', 'post_author' => 1)); ?>"
    },
    {
      "step": "runPHP",
      "code": "<?php require_once 'wordpress/wp-load.php'; wp_insert_post(array('post_title' => 'About Playground', 'post_content' => '<!-- wp:paragraph --><p>Playground is awesome!</p><!-- /wp:paragraph -->', 'post_status' => 'publish', 'post_type' => 'page', 'post_author' => 1)); ?>"
    }
  ]
}
```

**Important Notes:**

*   The require\_once `wordpress/wp-load.php` line in the PHP steps ensures you can use WordPress functions inside Playground (essential for `wp_insert_post` to work).
    
*   Content must be formatted using WordPress block markup (the `<!-- wp:paragraph --> ... <!-- /wp:paragraph -->` wrappers around the `<p>` tags) to render correctly in the inserted posts.
    

### **Creating Your URL: Base64 Encoding (Recommended)**

For more complex Blueprints (like the one above), WordPress Playground officially recommends using Base64 encoding for the URL. This prevents issues where spaces, quotes, or special characters in the JSON might break your URL.

**How to encode your JSON Blueprint:**

1.  Copy your Blueprint JSON into a text encoder (you can use an online tool or a command-line tool) and convert it to a Base64 string.
    
2.  Take that Base64 string and append it to the Playground URL after the #. For example:
    

```
<https://playground.wordpress.net/#YOUR_BASE64_ENCODED_STRING>
```

Here’s an example of an encoded Blueprint URL (already Base64 encoded) for the full Blueprint above. Clicking this URL will instantly launch Playground with the exact setup we defined (custom site title, theme, plugin, and content all loaded):

```
<https://playground.wordpress.net/#ewogICJsYW5kaW5nUGFnZSI6ICIvd3AtYWRtaW4vZWRpdC5waHAiLAogICJsb2dpbiI6IHRydWUsCiAgInN0ZXBzIjogW3sic3RlcCI6ICJzZXRTaXRlT3B0aW9ucyIsICJvcHRpb25zIjogeyJibG9nbmFtZSI6ICJNeSBBd2Vzb21lIFBsYXlncm91bmQiLCAiYmxvZ2Rlc2NyaXB0aW9uIjogIlRlc3RpbmcgV29yZFByZXNzIFBsYXlncm91bmQgQmx1ZXByaW50cyEifX0sIHsic3RlcCI6ICJpbnN0YWxsUGx1Z2luIiwgInBsdWdpbkRhdGEiOiB7ICJyZXNvdXJjZSI6ICJ3b3JkcHJlc3Mub3JnL3BsdWdpbnMiLCAic2x1ZyI6ICJjb2Jsb2NrcyIgfX0sIHsic3RlcCI6ICJpbnN0YWxsVGhlbWUiLCAidGhlbWVEYXRhIjogeyAicmVzb3VyY2UiOiAid29yZHByZXNzLm9yZy90aGVtZXMiLCAic2x1ZyI6ICJ0d2VudHl0d2VudHlmb3VyIiB9fSwgeyJzdGVwIjogImFjdGl2YXRlVGhlbWUiLCAidGhlbWVGb2xkZXJOYW1lIjogInR3ZW50eXR3ZW50eWZvdXIifSwgeyJzdGVwIjogInJ1blBIUCIsICJjb2RlIjogIjw/cGhwIHJlcXVpcmVfb25jZSAnd29yZHByZXNzL3dwLWxvYWQucGhwJzsgd3BfaW5zZXJ0X3Bvc3QoYXJyYXkoJ3Bvc3RfdGl0bGUnID0+ICdIZWxsbyBmcm9tIFBsYXlncm91bmQhJywgJ3Bvc3RfY29udGVudCcgID0+ICc8IS0tIHdwOnBhcmFncmFwaCAtLT48cD5UaGlzIGlzIG15IGZpcnN0IGJsb2cgcG9zdCB1c2luZyBQbGF5Z3JvdW5kITwvcD48IS0tIC93cDpwYXJhZ3JhcGggLS0+JywgJ3Bvc3Rfc3RhdHVzJyA9PiAncHVibGlzaCcsICdwb3N0X2F1dGhvcicgPT4gMSkpOyA/PiJ9LCB7InN0ZXAiOiAicnVuUEhQIiwgImNvZGUiOiAiPD9waHAgcmVxdWlyZV9vbmNlICd3b3JkcHJlc3Mvd3AtbG9hZC5waHAnOyB3cF9pbnNlcnRfcG9zdChhcnJheSgncG9zdF90aXRsZScgPT4gJ0Fib3V0IFBsYXlncm91bmQnLCAncG9zdF9jb250ZW50JyAgPT4gJzwhLS0gd3A6cGFyYWdyYXBoIC0tPjxwPlBsYXlncm91bmQgaXMgYXdlc29tZSE8L3A+PCEtLSAtL3dwOnBhcmFncmFwaCAtLT4nLCAncG9zdF9zdGF0dXMnID0+ICdwdWJsaXNoJywgJ3Bvc3RfdHlwZScgPT4gJ3BhZ2UnLCAncG9zdF9hdXRob3InID0+IDEpKTsgPz4ifV19>
```

### **Why Base64?** It’s recommended because:

*   It prevents browser URL issues (no problems with spaces or special characters).
    
*   It ensures reliable Blueprint loading every time.
    
*   It’s officially endorsed by the Playground docs.
    

## **Installing Plugins from GitHub in Playground**

Now that we understand the basics of Blueprints, let’s explore how you can install and activate a plugin directly from a **GitHub repository** inside WordPress Playground.

**Why load plugins from GitHub?** While [WordPress.org](http://WordPress.org) is the standard place for plugins, sometimes you need to:

*   Test a custom plugin before publishing it.
    
*   Load a plugin branch that’s under development.
    
*   Share a private plugin with a team (without publishing it).
    
*   Demo a work-in-progress feature for feedback.
    

With Playground’s GitHub Proxy, you can install any plugin from a GitHub repo in a Playground environment. The GitHub Proxy handles fetching the plugin code and avoids CORS (cross-origin) issues that normally prevent direct downloads in the browser.

**Example: Installing a GitHub-hosted Plugin**

Let’s say we want to install a plugin called `Gridify` from a GitHub repository. We can do this by specifying a Blueprint step with a **resource:** **`url`** and pointing it to the GitHub proxy URL for that repo. For example:

```
{
  "landingPage": "/wp-admin/plugins.php",
  "login": true,
  "steps": [
    {
      "step": "installPlugin",
      "pluginData": {
        "resource": "url",
        "url": "<https://github-proxy.com/proxy/?repo=elpuas/gridify>"
      }
    }
  ]
}
```

**What this Blueprint will do:**

*   Install the **Gridify** plugin directly from its GitHub repository (via the GitHub Proxy).
    
*   Log you into the WordPress admin and take you straight to the **Plugins** screen, where you’ll see **Gridify** listed as installed (ready to be activated or used).
    

**Quickly Test It Yourself:** Try this one-click Playground URL to instantly launch a WordPress instance with the plugin fetched from GitHub:

```
<https://playground.wordpress.net/#{"landingPage":"/wp-admin/plugins.php","login":true,"steps":[{"step":"installPlugin","pluginData":{"resource":"url","url":"https://github-proxy.com/proxy/?repo=elpuas/gridify"}>}]}
```

Copy and paste the above URL into your browser’s address bar. After a moment, Playground will load WordPress, log you in, and you’ll find the Gridify plugin in the **Plugins** list of the dashboard.

**How It Works**

*   **GitHub Proxy for Playground:** Playground uses a proxy service ([https://github-proxy.com/proxy/](https://github-proxy.com/proxy/)) to fetch the plugin ZIP from GitHub on the fly. This bypasses any cross-origin restrictions, so the browser can download the plugin code as if it came from the same domain.
    
*   **No manual ZIP upload needed:** You don’t have to download the plugin or package it as a ZIP yourself. The proxy grabs the latest version of the plugin repository automatically.
    
*   **Optional: specify branches or versions:** By default, the proxy fetches the default branch (usually “main” or “master”). If you want to load a specific branch or commit, you can add parameters to the URL. For example, to get the develop branch of the `Gridify` repo, use:
    

```
<https://github-proxy.com/proxy/?repo=elpuas/gridify&branch=develop>
```

You could similarly specify a tag or commit hash if needed.

Using this method, you can quickly test any plugin from GitHub in seconds, without leaving your browser or messing with local installations.

## **Using wp-now for Local WordPress Development (with Blueprints)**

When working on a WordPress plugin or theme locally, setting up a development environment can be a hassle. `wp-now` simplifies this by allowing you to run WordPress instantly without installing a web server or database on your machine. It uses a WebAssembly-powered PHP and a lightweight SQLite database, which means no Apache, no MySQL – just a quick environment that runs in a container under the hood.

Think of `wp-now` as the local CLI equivalent of Playground: it spins up WordPress on demand. And the great news is that `wp-now` also supports Blueprints!

**Where Should the Blueprint Go?**

To customize your `wp-now` setup, you’ll create a blueprint.json file and place it in the root of your project directory.

*   **If you’re working on a plugin**, your project structure should look like this:
    

```
/my-plugin
  ├── blueprint.json   ← Blueprint file here
  ├── my-plugin.php
  ├── README.md
```

*   **If you’re working on a theme**, your structure would be:
    

```
/my-theme
  ├── blueprint.json   ← Blueprint file here
  ├── style.css
  ├── functions.php
  ├── index.php
```

When blueprint.json is in place at the root, `wp-now` will detect it and apply those settings when starting the local environment.

**Installing and Running** **`wp-now`**

You don’t need to install anything globally if you don’t want to. Using **`npx`** (which comes with Node.js ), you can run `wp-now` on demand. Just navigate to your project’s root directory in your terminal and run:

```
npx @wp-now/wp-now start
```

This command will download and launch a WordPress instance in that directory. By default, it starts a clean WordPress with the latest version of core.

**Tip:** The first time you run `wp-now`, it might take a bit longer as it downloads the necessary components (WordPress core files, the PHP runtime, etc.). Subsequent starts are much faster since those components are cached locally.

Out of the box, `wp-now` start without any options will give you a WordPress site (usually on http://localhost:8881) with the latest WordPress and PHP 8.0. However, it won’t have any custom plugins or themes active, and it uses a fresh SQLite database. You can use a Blueprint to customize this setup (for example, to pre-install your plugin or use a specific WordPress version).

## **Using a Blueprint with wp-now**

Blueprints allow you to define things like:

*   The WordPress version and PHP version to use.
    
*   Which themes or plugins to install (and even activate).
    
*   Custom site options or content to initialize.
    

Let’s create an example **blueprint.json** for a plugin project. This Blueprint will ensure our local `wp-now` environment uses WordPress 6.5, PHP 8.2, sets a custom site title, and activates a specific theme:

```
{
  "$schema": "<https://playground.wordpress.net/blueprint-schema.json>",
  "login": true,
  "preferredVersions": {
    "wp": "6.5",
    "php": "8.2"
  },
  "siteOptions": {
    "blogname": "WP-Now Local Site"
  },
  "steps": [
    {
      "step": "installTheme",
      "themeData": {
        "resource": "wordpress.org/themes",
        "slug": "twentytwentyfive"
      }
    },
    {
      "step": "activateTheme",
      "themeFolderName": "twentytwentyfive"
    }
  ]
}
```

Here’s what this Blueprint does: it logs you in automatically ("login": true gives you an admin session), ensures WordPress 6.5 and PHP 8.2 are used, changes the site title to “WP-Now Local Site,” then installs and activates the Twenty Twenty-Five theme.

### **Running** **`wp-now`** **with a Blueprint**

Once your blueprint.json file is in the root of your project, start wp-now with the Blueprint flag:

```
cd my-plugin   # or cd my-theme
npx @wp-now/wp-now start --blueprint=blueprint.json
```

This tells `wp-now` to load and execute the steps from your Blueprint as it starts up.

What will happen when you run that?

*   It will start WordPress using version **6.5** and PHP **8.2** (as specified in preferredVersions).
    
*   It will install **Twenty Twenty-Five** theme and activate it automatically.
    
*   It will log you into the site (so when your browser opens, you’re already in the admin dashboard).
    
*   Your site title will be set to “WP-Now Local Site” (you can verify this in Settings > General).
    

You should see your WordPress site launch in a browser window shortly after running the command. The active theme will be Twenty Twenty-Five, and you’ll be logged in as an admin user (with default credentials, usually username **admin** and password **password** for Playground environments).

**Why Use wp-now with Blueprints?**

Using wp-now together with Blueprints combines the convenience of instant local WordPress with the power of pre-configured setups:

*   **No setup required:** You don’t need to install Apache, MySQL, or PHP on your system. wp-now uses a portable PHP (via WebAssembly) and an embedded database.
    
*   **Runs instantly:** No complex database configuration or .env files. One command, and you have WordPress running.
    
*   **Reproducible environment:** Share your Blueprint with teammates – everyone who runs wp-now with that Blueprint gets the exact same setup. This consistency is great for collaboration and testing.
    
*   **Easy to reset:** Need a clean slate? It’s simple to start over. You can restart wp-now with a flag (or clear its cache) to get a fresh WordPress install whenever necessary, ensuring you always have a pristine environment to test with.
    

_I hope this deep dive into WordPress Playground Blueprints, GitHub plugin integration, and_ _`wp-now`_ _helps you in your WordPress development workflow. Whether you’re spinning up quick demos in the browser or streamlining your local development, these tools are here to make your life easier. Happy Coding!_

##### Give and Share

Enjoyed this article? Share it with your friends and colleagues!

[X](<https://twitter.com/intent/tweet?url=https://elpuas.com/blog/taking-playground-further-meet-blueprints/&text=Learn how WordPress Playground simplifies setup with Blueprints. Instantly create demo sites, automate local setups with wp-now>) [Facebook](https://www.facebook.com/sharer/sharer.php?u=https://elpuas.com/blog/taking-playground-further-meet-blueprints/) [LinkedIn](https://www.linkedin.com/sharing/share-offsite/?url=https://elpuas.com/blog/taking-playground-further-meet-blueprints/) [Reddit](<https://www.reddit.com/submit?url=https%3A%2F%2Felpuas.com%2Fblog%2Ftaking-playground-further-meet-blueprints%2F&title=WordPress Playground: Easy Setup with Blueprints and wp-now>)

##### Buy Me a Coffee

If you found this article helpful, consider buying me a coffee!

[](https://buymeacoffee.com/elpuas)

## Recent Posts

[

##### A Year with the WordPress Community

El Puas

WordPress

](/blog/a-year-with-the-wordpress-community)[

##### WordCamp US 2025 – Portland, Oregon

El Puas

WordPress

](/blog/wordcamp-us-2025-portland-oregon)