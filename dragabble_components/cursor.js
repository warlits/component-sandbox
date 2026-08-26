// kunin ang cursor element sa HTML file, pangalanan itong customCursor
const customCursor = document.querySelector('#custom-cursor');

// gamit ang loop, kunin ulit isa isa ang card, at iapply ang mga eventlistener na to
cards.forEach((card) => {
    // sa pag hover in ng cursor sa bawat card, tatargetin nya yung css selector ng customCursor
    // then tatargetin nya yung attribute na nasa pangatlong phase ng line ng code, in this case, yung display
    // initially,sa css yang display na yan is none
    // and iseset natin sya as display: block once na magenter/maghover ang pointer sa card.
    card.addEventListener('pointerenter', () =>{
        customCursor.style.display = "block"
    });


    // same process lang rin dito. in this case, pointer leave.
    // pag lalabas na yung cursor/pointer sa card, ibabalik na natin sa none yung display attribute.
    card.addEventListener('pointerleave', () =>{
        customCursor.style.display = "none"
    });

    // sa bawat galaw ng cursor, kukunin ang current position ng pointer at gawing yun ang current position ng customCursor
    // means, kung nasan ang cursor, sundan to ng customCursor 

    // ang 12 ay isa lamang custom offset ng customCursor. it adds (n)px off the tip of the cursor (12px top, 12px left).
    // meaning if its 0px, it is exactly at the tip of the cursor
    card.addEventListener('pointermove', (mouseEvent) => {
        customCursor.style.left = mouseEvent.clientX + 12 + "px";
        customCursor.style.top = mouseEvent.clientY + 12 + "px";
    });
})
