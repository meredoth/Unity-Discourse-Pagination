# Unity Discourse Pagination - Chrome extension

A simple Chrome extension that adds pagination to Unity's Discourse forum.

The extension adds five buttons: the first and last buttons navigate to the first and last "pages" of the topic, the +1 and -1 buttons move to the next and previous "pages" respectively, and the middle button displays the current "page" and, when clicked, goes to the first post of that "page".

Users can still scroll through the topic continuously, and the middle button will show the current "page" whenever scrolling stops.

Each page contains 20 posts, but this can easily be changed by modifying the ```postsPerPage``` variable at the beginning of the ```pagination.js``` file.

![Extension buttons](/images/Pagination.png)

To install, download the project and go to the chrome://extensions/ tab. Click the "Load unpacked" button and select the folder containing the project.

This program is licensed under the GNU General Public License. You can read the full license text [here](/LICENSE.md)

DISCLAIMER:

I created this extension for fun and have no particular interest in pagination functionality for Unity's Discourse forum. Therefore, I probably won't be updating or changing this extension.

Feel free to use the provided JavaScript file as a starting point. If you want different buttons, buttons in a different location on the screen, different CSS, and so on, I am not going to do it, you can customize it as needed.
